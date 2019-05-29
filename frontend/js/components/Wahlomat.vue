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
          VueSwing.Direction.UP,
          VueSwing.Direction.DOWN
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
      // minThrowOutDistance: 10000,
      // maxThrowOutDistance: 10000,
      swiped: [],
      hidden: [],
      activeThesis: this.election.theses[this.election.theses.length - 1]
    };
  },
  methods: {
    answerYes(payload) {
      this.answer(payload.target.id, "yes");
    },
    answerNo(payload) {
      this.answer(payload.target.id, "no");
    },
    answerNeutral(payload) {
      this.answer(payload.target.id, "neutral");
    },
    skip(payload) {
      this.answer(payload.target.id, "skip");
    },
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
    throwOutAnimationEnded(payload) {
      let thesis = this.election.theses.filter(
        x => x.key.toString() === payload.target.id.toString()
      )[0];

      this.hidden.push(thesis.key);

      // If all cards have been answered, emit an event with the results as payload so that App.vue can handle page switching
      if (this.swiped.length === this.election.theses.length) {
        this.$emit("finished", this.swiped);
      }
    },
    buttonClicked(answer) {
      let target = this.$refs.viewswing.cards[
        this.election.theses.length - 1 - this.swiped.length
      ];

      switch (answer) {
        case "no":
          target.throwOut(0, 0, VueSwing.Direction.LEFT);
          break;
        case "neutral":
          target.throwOut(0, 0, VueSwing.Direction.UP);
          break;
        case "yes":
          target.throwOut(0, 0, VueSwing.Direction.RIGHT);
          break;
        case "skip":
          target.throwOut(0, 0, VueSwing.Direction.DOWN);
          break;
      }
    }
  }
};
</script>
<template>
  <div class="site-container">
    <div>
      <div style="text-align:center;margin:2rem;font-size:25px;color:#fff;">{{election.name}}</div>
      <vue-swing
        @throwoutleft="answerNo"
        @throwoutright="answerYes"
        @throwoutup="answerNeutral"
        @throwoutdown="skip"
        @throwoutend="throwOutAnimationEnded"
        :config="config"
        ref="viewswing"
      >
        <div
          v-for="thesis in election.theses"
          :key="thesis.key"
          class="card"
          :id="thesis.key"
          v-show="!hidden.some((x) => x.toString() === thesis.key.toString())"
          :ref="'card' + thesis.key"
        >
          <div class="card-content">
            <div style="font-weight:bold;">{{ thesis.thesis }}</div>
            <div
              style="margin:10px;color:#666;"
            >Frage {{election.theses.length - election.theses.indexOf(thesis)}} von {{election.theses.length}}</div>
          </div>
        </div>
      </vue-swing>
    </div>
    <div class="button-container">
      <div>
        <button @click="buttonClicked('no')" class="no circleButton">
          <svg style="width:27px;height:27px" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
            ></path>
          </svg>
        </button>
        <button
          @click="buttonClicked('neutral')"
          class="neutral circleButton"
          style="width:2.5rem;height:2.5rem;"
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="#333"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11A1.5,1.5 0 0,1 7,9.5M16,16H8V14H16V16M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11Z"
            ></path>
          </svg>
        </button>
        <button @click="buttonClicked('yes')" class="yes circleButton">
          <svg style="width:27px;height:27px" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
            ></path>
          </svg>
        </button>
      </div>
      <a class="link-button" style="margin:15px;" @click="buttonClicked('skip')">Frage überspringen</a>
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
  top: calc(50% - 40% + 50px);
  width: 80%;
  flex-direction: column;
  text-align: center;
}

.card-content {
  margin: 2rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: calc(55% + 50px);
  width: 100%;
}

.circleButton {
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

.link-button {
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
}

.card-stack-container {
  height: 50%;
  max-height: 500px;
}

.site-container {
  height: 100vh;
}
</style>