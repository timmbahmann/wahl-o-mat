<script>
import VueSwing from "vue-swing";

export default {
  components: { VueSwing },
  props: ["election"],
  data() {
    return {
      config: {
        allowedDirections: [
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT,
          VueSwing.Direction.UP
        ],
        throwOutConfidence: (xOffset, yOffset, element) => {
          let xConfidence = Math.min(
            Math.abs(xOffset) / element.offsetWidth,
            1
          );
          let yConfidence = Math.min(
            Math.abs(yOffset) / element.offsetHeight,
            1
          );

          return Math.min(Math.max(xConfidence, yConfidence) * 2, 1);
        }
      },
      minThrowOutDistance: 250,
      maxThrowOutDistance: 300,
      swiped: [],
      activeThesis: this.election.theses[this.election.theses.length - 1]
    };
  },
  methods: {
    answerYes(payload) {
      this.answer(payload.target.id, 2);
    },
    answerNo(payload) {
      this.answer(payload.target.id, 0);
    },
    answerNeutral(payload) {
      this.answer(payload.target.id, 1);
    },
    skip() {},
    goBack() {},
    answer(thesisId, answer) {
      let thesis = this.election.theses.filter(
        x => x.key.toString() === thesisId.toString()
      )[0];

      this.swiped.push({
        thesis: thesis,
        result: answer
      });

      this.activeThesis =
        this.swiped.length < this.election.theses.length
          ? this.election.theses[
              this.election.theses.length - 1 - this.swiped.length
            ]
          : null;
    },

    buttonClicked(answer) {
      let target = this.$refs.viewswing.cards[
        this.election.theses.length - 1 - this.swiped.length
      ];

      switch (answer) {
        case 0:
          target.throwOut(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            VueSwing.Direction.LEFT
          );
          setTimeout(() => {
            [1].pop();
          }, 100);
          break;
        case 1:
          target.throwOut(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            VueSwing.Direction.UP
          );
          setTimeout(() => {
            [1].pop();
          }, 100);
          break;
        case 2:
          target.throwOut(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            VueSwing.Direction.RIGHT
          );
          setTimeout(() => {
            [1].pop();
          }, 100);
          break;
      }
    }
  }
};
</script>
<template>
  <div class="site-container">
    <div>
      <vue-swing
        @throwoutleft="answerNo"
        @throwoutright="answerYes"
        @throwoutup="answerNeutral"
        :config="config"
        ref="viewswing"
      >
        <div
          v-for="thesis in election.theses"
          :key="thesis.key"
          class="card"
          :id="thesis.key"
          v-show="!swiped.some((x) => x.thesis.key.toString() === thesis.key.toString())"
          :ref="'card' + thesis.key"
        >
          <div>thesis:</div>
          <div>{{ thesis.thesis }}</div>
          <div style="display:flex;">
            <div v-for="answer in thesis.answers" :key="answer.key">
              <div style="font-weight:bold;margin:10px;">{{ answer.name }}</div>
              <div>{{ answer.answer }}</div>
            </div>
          </div>
        </div>
      </vue-swing>
    </div>
    <div class="button-container">
      <button @click="buttonClicked(0)">👎</button>
      <button @click="buttonClicked(1)">🤷</button>
      <button @click="buttonClicked(2)">👍</button>
    </div>
  </div>
</template>
<style scoped>
.card {
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  /* font-size: 72px; */
  height: 40%;
  justify-content: center;
  left: calc(50% - 40%);
  position: absolute;
  top: calc(50% - 40%);
  width: 80%;
  flex-direction: column;
}

.button-container {
  margin: 50px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  left: calc(50% - 30%);
  position: absolute;
  top: calc(50%);
  width: 30%;
}

.button-container > button {
  margin: 10px;
}

.card-stack-container {
  height: 50%;
  max-height: 500px;
}

.site-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>