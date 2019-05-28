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
          target.throwOut(0, 0, VueSwing.Direction.LEFT);
          break;
        case 1:
          target.throwOut(0, 0, VueSwing.Direction.UP);
          break;
        case 2:
          target.throwOut(0, 0, VueSwing.Direction.RIGHT);
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
      <button @click="buttonClicked(0)" class="no">
        <svg style="width:27px;height:27px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
          ></path>
        </svg>
      </button>
      <button @click="buttonClicked(1)" class="neutral" style="width:2.5rem;height:2.5rem;">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="#333"
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11A1.5,1.5 0 0,1 7,9.5M16,16H8V14H16V16M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11Z"
          ></path>
        </svg>
      </button>
      <button @click="buttonClicked(2)" class="yes">
        <svg style="width:27px;height:27px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
          ></path>
        </svg>
      </button>
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
  height: 40%;
  justify-content: center;
  left: calc(50% - 40%);
  position: absolute;
  top: calc(50% - 40%);
  width: 80%;
  flex-direction: column;
}

.button-container {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: calc(50%);
  width: 100%;
}

.button-container > button {
  cursor: pointer;
  border: 0;
  height: 3rem;
  width: 3rem;
  border-radius: 3rem;
  margin: 1em;
  transition: all 0.1s ease;
  box-shadow: 0 0.75rem 30px 0 rgba(0, 0, 0, 0.4);
}

.button-container > button:hover {
  box-shadow: 0 0.75rem 30px 0 rgba(0, 0, 0, 0.7);
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