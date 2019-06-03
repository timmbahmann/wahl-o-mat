<script>
import LandingPage from "./LandingPage";
import Wahlomat from "./Wahlomat";
import ResultPage from "./ResultPage";

export default {
  components: {
    LandingPage,
    Wahlomat,
    ResultPage
  },
  data() {
    return {
      election: {},
      displayedComponent: "landingPage",
      lastElectionResult: {}
    };
  },
  created() {
    this.election = {
      name: "Fakultätsratswahl WS 2019",
      panel: "Fakultätsrat",
      theses: [
        {
          key: 1,
          thesis: "Alle Menschen sind Doof",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          key: 2,
          thesis: "Der Dekan muss weg",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "ja"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          key: 3,
          thesis: "Leon for presidente",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          key: 4,
          thesis: "Mehr für Weniger",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          key: 5,
          thesis: "Mehr Arbeitsräume für Mathematiker",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          key: 6,
          thesis: "Schmeißt die Mathematiker raus",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          key: 7,
          thesis: "Soll Mathe grundsätzlich abgeschafft werden?",
          answers: [
            {
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              name: "EB301",
              answer: "ja"
            },
            {
              name: "AStA",
              answer: "neutral"
            }
          ]
        }
      ]
    };
  },
  methods: {
    switchPage(page) {
      this.displayedComponent = page;
    },
    showResults(results) {
      this.lastElectionResult = results;
      console.log(this.lastElectionResult);
      this.switchPage("resultPage");
    }
  }
};
</script>
<template>
  <div>
    <div>
      <LandingPage v-if="displayedComponent === 'landingPage'"></LandingPage>
      <Wahlomat
        v-else-if="displayedComponent === 'wahlomat'"
        :election="election"
        @finished="showResults"
      ></Wahlomat>
      <ResultPage v-else-if="displayedComponent === 'resultPage'"></ResultPage>
    </div>
    <div>
      <button @click="switchPage('landingPage')">Startseite</button>
      <button @click="switchPage('wahlomat')">Thesenansicht</button>
      <button @click="switchPage('resultPage')">Ergebnisseite</button>
    </div>
  </div>
</template>
<style>
body {
  background-color: #262626;
  margin: 0;
  font-family: Helvetica, sans-serif;
}

.yes {
  background: linear-gradient(135deg, #768c54 0, #4e5c37);
}

.neutral {
  background: linear-gradient(135deg, #c1c1c1 0, #9b9b9b);
}

.no {
  background: linear-gradient(135deg, #a63232 0, #6b2020);
}
</style>
