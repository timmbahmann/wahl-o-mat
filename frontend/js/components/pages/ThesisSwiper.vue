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
import * as ResultCalculator from "../../helpers/ResultCalculator";
import { YES, NO, NEUTRAL, SKIP } from "../../helpers/Constants";

export default {
  components: {
    VueSwing,
    ThumbsDownIcon,
    ThumbsUpIcon,
    NeutralIcon,
    ThesisCard
  },
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
      election: {},
      thesisStack: null,
      swipeStackHelper: SwipeStackHelper,
      choices: { yes: YES, no: NO, neutral: NEUTRAL, skip: SKIP }
    };
  },
  created() {
    fetch(`/api/wahl/${encodeURIComponent(this.$route.params.election)}`, {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(election => {
        (this.election = election[0]),
          (this.thesisStack = new ThesisStack(this.election.thesen));
      });
  },
  methods: {
    answer(thesisId, answer) {
      this.thesisStack.answer(thesisId, answer);

      // If all cards have been answered, emit an event with the results as payload
      // so that App.vue can handle page switching to the results page
      if (this.thesisStack.Finished) {
        this.$emit(
          "finished",
          ResultCalculator.getResults(this.thesisStack.answeredTheses)
        );
      }
    },
    goBack() {
      if (this.thesisStack.AnsweredTheses.length > 0) {
        let previousThesis = this.thesisStack.AnsweredTheses[
          this.thesisStack.answeredTheses.length - 1
        ];

        let previousCard = this.$refs["card" + previousThesis.thesis._id][0]
          .$el;

        let poppedThesis = this.thesisStack.revert();

        let swingElement = this.$refs.vueswing.cards[
          this.thesisStack.theses.length -
            1 -
            this.thesisStack.answeredTheses.length
        ];

        SwipeStackHelper.swipeInCard(
          previousCard,
          previousThesis.result
        );

        swingElement.throwIn(
          poppedThesis.result.xCoordinate,
          poppedThesis.result.yCoordinate
        );
      }
    },
    buttonClicked(answer) {
      // Get the actual div that makes up the card to change its style during the animation...
      let activeCard = this.$refs["card" + this.thesisStack.ActiveThesis._id][0]
        .$el;

      // ...and animate a swipe-out in the direction that fits the provided answer
      SwipeStackHelper.swipeOutCard(activeCard, answer);

      // The throwout animation will take 40 * 5 milliseconds, so we execute this after that time has passed
      setTimeout(() => {
        // Get the element that represents the swiped card internally for the swing stack
        let swingElement = this.$refs.vueswing.cards[
          this.thesisStack.theses.length -
            1 -
            this.thesisStack.answeredTheses.length
        ];

        // Use swing's built-in method to "officially" swipe out the card so that swing realizes it
        // This will also trigger the regular swipeout event of the direction corresponding to the coordinates
        swingElement.throwOut(answer.xCoordinate, answer.yCoordinate);

        // Reset the 'left' and 'top' properties of the card style to undefined because they were only needed for
        // the swipeout animation and would otherwise interfere with the throwin animation when going back a card
        SwipeStackHelper.resetCardPosition(activeCard);
      }, 40 * 5);
    },
    dragging(card, throwDirection, throwOutConfidence) {
      let direction = SwipeStackHelper.getResultObjectFromValue(throwDirection);
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
      <h1 class="page-headline">{{election.name ? election.name.toUpperCase() : ""}}</h1>
      <vue-swing
        @throwoutleft="(payload) => this.answer(payload.target.id, choices.no)"
        @throwoutright="(payload) => this.answer(payload.target.id, choices.yes)"
        @throwoutdown="(payload) => this.answer(payload.target.id, choices.neutral)"
        @throwoutup="(payload) => this.answer(payload.target.id, choices.skip)"
        @dragmove="(payload) => this.dragging(payload.target, payload.throwDirection, payload.throwOutConfidence)"
        @dragend="(payload) => this.finishedDragging(payload.target)"
        :config="swingConfig"
        ref="vueswing"
      >
        <ThesisCard
          v-for="thesis in election.thesen"
          v-show="!thesisStack.AnsweredTheses.some((x) => x.thesis._id === thesis._id)"
          :key="thesis._id"
          :id="thesis._id"
          :thesis="thesis"
          :distanceFromActiveThesis="election.thesen.indexOf(thesisStack.ActiveThesis)-election.thesen.indexOf(thesis)"
          :index="election.thesen.length - election.thesen.indexOf(thesis)"
          :totalThesesCount="election.thesen.length"
          :currentSwipeResult="currentSwipeDirection"
          :ref="'card' + thesis._id"
        />
      </vue-swing>
    </div>
    <div class="button-container">
      <div>
        <button @click="buttonClicked(choices.no)" class="no circleButton">
          <ThumbsDownIcon
            width="'27px'"
            :height="'27px'"
            :viewBox="'0 0 24 24'"
            :fillColor="'#fff'"
          />
        </button>
        <button
          @click="buttonClicked(choices.neutral)"
          class="neutral circleButton"
          style="width:3rem;height:3rem;"
        >
          <NeutralIcon :width="'24px'" :height="'24px'" :viewBox="'0 0 24 24'" :fillColor="'#333'"/>
        </button>
        <button @click="buttonClicked(choices.yes)" class="yes circleButton">
          <ThumbsUpIcon
            :width="'27px'"
            :height="'27px'"
            :viewBox="'0 0 24 24'"
            :fillColor="'#fff'"
          />
        </button>
      </div>
      <a class="link-button" style="margin:15px;" @click="goBack">Frage zurück</a>
      <a class="link-button" @click="buttonClicked(choices.skip)">Frage überspringen</a>
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