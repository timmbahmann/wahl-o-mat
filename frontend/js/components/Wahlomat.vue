<script>
import VueSwing from "vue-swing";

export default {
  components: { VueSwing },
  props: ["thesen"],
  data() {
    return {
      config: {
        allowedDirections: [VueSwing.Direction.LEFT, VueSwing.Direction.RIGHT],
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
      swiped: [],
      activeThesis: this.thesen[this.thesen.length - 1].key
    };
  },
  methods: {
    throwout(data) {
      let answer =
        String(data.throwDirection)
          .replace("Symbol", "")
          .replace("(", "")
          .replace(")", "")
          .toLowerCase() === "left"
          ? 0
          : 2;

      let thesis = this.thesen.filter(
        x => x.key.toString() === data.target.id.toString()
      )[0];

      this.cardSwiped(thesis, answer);
    },

    cardSwiped(thesis, answer) {
      this.swiped.push({
        thesis: thesis,
        result: answer
      });

      this.activeThesis =
        this.swiped.length < this.thesen.length
          ? this.thesen[this.thesen.length - 1 - this.swiped.length].key
          : null;

      if (this.swiped.length === this.thesen.length) console.log(this.swiped);
    },

    buttonClicked(answer) {
      let target = this.$refs.viewswing.cards[
        this.thesen.length - 1 - this.swiped.length
      ];

      target.throwOut(Math.random() * 100 - 50, Math.random() * 100 - 50);
    }
  }
};
</script>
<template>
  <div class="site-container">
    <div>
      <vue-swing @throwout="throwout" :config="config" ref="viewswing">
        <div
          v-for="these in thesen"
          :key="these.key"
          class="card"
          :id="these.key"
          v-show="!swiped.some((x) => x.thesis.key.toString() === these.key.toString())"
          :ref="'card' + these.key"
        >
          <div>These:</div>
          <div>{{ these.these }}</div>
          <div style="display:flex;">
            <div v-for="antwort in these.antworten" :key="antwort.key">
              <div style="font-weight:bold;margin:10px;">{{ antwort.name }}</div>
              <div>{{ antwort.antwort }}</div>
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