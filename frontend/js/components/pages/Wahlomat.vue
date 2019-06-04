<script>
import VueSwing from "vue-swing";
import { setTimeout } from "timers";

// Import Icon components
import ThumbsDownIcon from "../icons/ThumbsDown";
import ThumbsUpIcon from "../icons/ThumbsUp";
import NeutralIcon from "../icons/Neutral";

// Import element components
import ThesisCard from "../elements/ThesisCard";

// Import helper classes
import ThesisStack from "../../helpers/ThesisStack";
import * as SwipeStackHelper from "../../helpers/SwipeStackHelper";

export default {
  components: {
    VueSwing,
    ThumbsDownIcon,
    ThumbsUpIcon,
    NeutralIcon,
    ThesisCard
  },
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
      currentSwipeDirection: null,
      thesisStack: new ThesisStack(this.election.theses)
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
    answer(thesisId, answer) {
      this.thesisStack.answer(parseInt(thesisId), answer);

      // If all cards have been answered, emit an event with the results as payload
      // so that App.vue can handle page switching to the results page
      if (this.thesisStack.Finished) {
        this.$emit("finished", this.thesisStack.AnsweredTheses);
      }
    },
    goBack() {
      if (this.thesisStack.AnsweredTheses.length > 0) {
        let previousThesis = this.thesisStack.AnsweredTheses[
          this.thesisStack.answeredTheses.length - 1
        ];
        let previousCard = this.$refs["card" + previousThesis.thesis._id][0]
          .$el;

        SwipeStackHelper.bringCardBack(previousCard, previousThesis.result);

        this.thesisStack.revert();
      }
    },
    buttonClicked(answer) {
      let activeCard = this.$refs["card" + this.thesisStack.ActiveThesis._id][0]
        .$el;

      SwipeStackHelper.throwCardOut(activeCard, answer);

      setTimeout(() => {
        this.thesisStack.answerActiveThesis(answer);

        // If all cards have been answered, emit an event with the results as payload so that App.vue can handle page switching
        if (this.thesisStack.Finished) {
          this.$emit("finished", this.thesisStack.AnsweredTheses);
        }
      }, 40 * 5);
    },
    dragging(card, throwDirection, throwOutConfidence) {
      let direction = this.getDirectionFromSymbol(throwDirection);
      this.currentSwipeDirection = direction;

      SwipeStackHelper.dragging(card, direction, throwOutConfidence);
    },
    finishedDragging(card) {
      SwipeStackHelper.finishedDragging(card);

      this.currentSwipeDirection = null;
    }
  }
};
</script>
<template>
  <div class="site-container">
    <div>
      <h1 class="page-headline">{{election.name.toUpperCase()}}</h1>
      <vue-swing
        @throwoutleft="(payload) => answer(payload.target.id, 'no')"
        @throwoutright="(payload) => answer(payload.target.id, 'yes')"
        @throwoutdown="(payload) => answer(payload.target.id, 'neutral')"
        @throwoutup="(payload) => answer(payload.target.id, 'skip')"
        @dragmove="(payload) => this.dragging(payload.target, payload.throwDirection, payload.throwOutConfidence)"
        @dragend="(payload) => this.finishedDragging(payload.target)"
        :config="swingConfig"
        ref="vueswing"
      >
        <ThesisCard
          v-for="thesis in election.theses"
          v-show="!thesisStack.AnsweredTheses.some((x) => x.thesis._id === thesis._id)"
          :key="thesis._id"
          :id="thesis._id"
          :thesis="thesis"
          :distanceFromActiveThesis="election.theses.indexOf(thesisStack.ActiveThesis)-election.theses.indexOf(thesis)"
          :index="election.theses.length - election.theses.indexOf(thesis)"
          :totalThesesCount="election.theses.length"
          :currentSwipeDirection="currentSwipeDirection"
          :ref="'card' + thesis._id"
        />
      </vue-swing>
    </div>
    <div class="button-container">
      <div>
        <button @click="buttonClicked('no')" class="no circleButton">
          <ThumbsDownIcon
            width="'27px'"
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