const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * max - min) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      const monster = this.monsterHealth - attackValue;
      this.monsterHealth = monster <= 0 ? 0 : monster;
      this.addLogMessage("player", "Attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      const player = this.playerHealth - attackValue;
      this.playerHealth = player <= 0 ? 0 : player;
      this.addLogMessage("monster", "Attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      const monster = this.monsterHealth - attackValue;
      this.monsterHealth = monster <= 0 ? 0 : monster;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const heal = getRandomValue(8, 20);
      const healValue = this.playerHealth + heal;
      this.playerHealth = healValue >= 100 ? 100 : healValue;
      this.addLogMessage("player", "heal", heal);
      this.attackPlayer();
    },
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
