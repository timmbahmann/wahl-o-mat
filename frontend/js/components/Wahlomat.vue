<script>
import VueSwing from "vue-swing";
import { setTimeout } from "timers";

// Import Icon components
import ThumbsDownIcon from "./icons/ThumbsDown";
import ThumbsUpIcon from "./icons/ThumbsUp";
import NeutralIcon from "./icons/Neutral";

export default {
  components: { VueSwing, ThumbsDownIcon, ThumbsUpIcon, NeutralIcon },
  props: ["election"],
  data() {
    return {
      swingConfig: {
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
      swiped: [],
      hidden: [],
      activeThesis: this.election.theses[this.election.theses.length - 1],
      currentSwipeDirection: null
    };
  },
  methods: {
    getDirectionFromSymbol(symbol) {
      return String(symbol)
        .replace("Symbol", "")
        .replace("(", "")
        .replace(")", "")
        .toLowerCase();
    },
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
    goBack() {
      if (this.hidden.length > 0) {
        // Make the last card visible again
        this.hidden.pop();
        let previouslySelectedResult = this.swiped.pop();

        let lastCard = this.$refs.vueswing.cards[
          this.election.theses.length - this.swiped.length
        ];

        let newActiveThesis =
          this.swiped.length < this.election.theses.length
            ? this.election.theses[
                this.election.theses.length - 1 - this.swiped.length
              ]
            : null;

        let lastCardCache = this.$refs["card" + newActiveThesis.key][0];
        let answer = previouslySelectedResult.result;

        if (answer === "yes" || answer === "no") {
          for (let i = 40; i >= 0; i--) {
            setTimeout(() => {
              lastCardCache.style.left =
                "calc(50% - 40%" +
                (answer === "yes" ? " + " : " - ") +
                i * 1.5 +
                "%)";
            }, 40 * 5 - i * 5);
          }
        } else if (answer === "neutral" || answer === "skip") {
          for (let i = 40; i >= 0; i--) {
            setTimeout(() => {
              lastCardCache.style.top =
                "calc(50% - 40%" +
                (answer === "neutral" ? " + " : " - ") +
                i * 1.5 +
                "% + 50px)";
            }, 40 * 5 - i * 5);
          }
        }

        this.activeThesis = newActiveThesis;
      }
    },
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

      // If all cards have been answered, emit an event with the results as payload so that App.vue can handle page switching
      if (this.swiped.length === this.election.theses.length) {
        this.$emit("finished", this.swiped);
      }
    },
    throwOutAnimationEnded(payload) {
      let thesis = this.election.theses.filter(
        x => x.key.toString() === payload.target.id.toString()
      )[0];

      this.hidden.push(thesis.key);
    },
    buttonClicked(answer) {
      let activeThesisCache = this.activeThesis;
      let activeCardCache = this.$refs["card" + activeThesisCache.key][0];

      this.answer(activeThesisCache.key, answer);

      if (answer === "yes" || answer === "no") {
        for (let i = 0; i < 40; i++) {
          setTimeout(() => {
            activeCardCache.style.left =
              "calc(50% - 40%" +
              (answer === "yes" ? " + " : " - ") +
              i * 1.5 +
              "%)";
          }, i * 5);
        }
      } else if (answer === "neutral" || answer === "skip") {
        for (let i = 0; i < 40; i++) {
          setTimeout(() => {
            activeCardCache.style.top =
              "calc(50% - 40%" +
              (answer === "neutral" ? " + " : " - ") +
              i * 1.5 +
              "% + 50px)";
          }, i * 5);
        }
      }

      setTimeout(() => {
        // Hide the card by adding the thesis to the list of hidden theses
        this.hidden.push(activeThesisCache.key);

        // If all cards have been answered, emit an event with the results as payload so that App.vue can handle page switching
        if (this.swiped.length === this.election.theses.length)
          this.$emit("finished", this.swiped);
      }, 40 * 5);
    },
    dragging(payload) {
      let draggedCard = payload.target;

      // Let opacity decrease when the card gains throwOutConfidence but don't let it fall lower than 0.3
      draggedCard.style.opacity = Math.max(1 - payload.throwOutConfidence, 0.7);

      let direction = this.getDirectionFromSymbol(payload.throwDirection);

      if (payload.throwOutConfidence > 0.1) {
        if (direction === "right") {
          this.currentSwipeDirection = "YES";
          draggedCard.style.background =
            "hsl(83.6,25%," +
            Math.min(43.9 + (1 - payload.throwOutConfidence) * 100, 70) +
            "%)";
        } else if (direction === "left") {
          this.currentSwipeDirection = "NO";
          draggedCard.style.background =
            "hsl(0,53.7%," +
            Math.min(42.4 + (1 - payload.throwOutConfidence) * 100, 70) +
            "%)";
        } else if (direction === "down") {
          this.currentSwipeDirection = "NEUTRAL";
          draggedCard.style.background =
            "hsl(0,0%," +
            Math.min(75.7 + (1 - payload.throwOutConfidence) * 100, 70) +
            "%)";
        } else {
          this.currentSwipeDirection = "SKIP";
          draggedCard.style.background =
            "hsl(0,0%," +
            Math.min(75.7 + (1 - payload.throwOutConfidence) * 100, 70) +
            "%)";
        }
      }
    },
    finishedDragging(payload) {
      let draggedCard = payload.target;
      draggedCard.style.opacity = 1;
      draggedCard.style.background = "#fff";
      this.currentSwipeDirection = null;
    },
    getCardStyle(thesis) {
      if (this.election.theses.length > this.swiped.length) {
        let thesisId = thesis.key;
        let test =
          this.election.theses.length - this.election.theses.indexOf(thesis);
        let distanceFromActiveThesis =
          this.election.theses.indexOf(this.activeThesis) -
          this.election.theses.indexOf(thesis);
        let opacity = 1;

        return {
          filter: thesisId === this.activeThesis.key ? "none" : "blur(1px)",
          height: 43 + distanceFromActiveThesis + "%",
          opacity:
            distanceFromActiveThesis <= 3
              ? 1 - distanceFromActiveThesis * 0.3
              : 0
        };
      }
    }
  }
};
</script>
<template>
  <div class="site-container">
    <div>
      <h1
        style="text-align:center;margin:2rem;font-size:25px;color:#fff;"
      >{{election.name.toUpperCase()}}</h1>
      <vue-swing
        @throwoutleft="answerNo"
        @throwoutright="answerYes"
        @throwoutup="skip"
        @throwoutdown="answerNeutral"
        @throwoutend="throwOutAnimationEnded"
        @dragmove="dragging"
        @dragend="finishedDragging"
        :config="swingConfig"
        ref="vueswing"
      >
        <div
          v-for="thesis in election.theses"
          :key="thesis.key"
          class="card"
          :id="thesis.key"
          v-show="!hidden.some((x) => x.toString() === thesis.key.toString())"
          :ref="'card' + thesis.key"
          :style="getCardStyle(thesis)"
        >
          <div class="card-content">
            <div style="font-size:30px;font-weight:bold;color:#fff">{{currentSwipeDirection}}</div>
            <div style="font-weight:bold;">{{ thesis.thesis }}</div>
            <div
              style="margin:10px;color:#999;position:absolute;bottom:10px;right:20px;"
            >{{election.theses.length - election.theses.indexOf(thesis)}} / {{election.theses.length}}</div>
          </div>
        </div>
      </vue-swing>
    </div>
    <div class="button-container">
      <div>
        <button @click="buttonClicked('no')" class="no circleButton">
          <ThumbsDownIcon
            :width="'27px'"
            :height="'27px'"
            :viewBox="'0 0 24 24'"
            :fillColor="'#fff'"
          />
        </button>
        <button
          @click="buttonClicked('neutral')"
          class="neutral circleButton"
          style="width:3rem;height:3rem;"
        >
          <NeutralIcon :width="'24px'" :height="'24px'" :viewBox="'0 0 24 24'" :fillColor="'#333'"/>
        </button>
        <button @click="buttonClicked('yes')" class="yes circleButton">
          <ThumbsUpIcon
            :width="'27px'"
            :height="'27px'"
            :viewBox="'0 0 24 24'"
            :fillColor="'#fff'"
          />
        </button>
      </div>
      <a class="link-button" style="margin:15px;" @click="goBack">Frage zurück</a>
      <a class="link-button" @click="buttonClicked('skip')">Frage überspringen</a>
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
  top: calc(60% + 50px);
  width: 100%;
}

.circleButton {
  cursor: pointer;
  border: 0;
  height: 4rem;
  width: 4rem;
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

.site-container {
  height: 100vh;
}
</style>