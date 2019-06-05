<script>
import LandingPage from "./pages/LandingPage";
import Wahlomat from "./pages/Wahlomat";
import ResultPage from "./pages/ResultPage";

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
          _id: 1,
          thesis: "Alle Menschen sind Doof",
          answers: [
            {
              _id: 11,
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              _id: 12,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 13,
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          _id: 2,
          thesis: "Der Dekan muss weg",
          answers: [
            {
              _id: 21,
              name: "Freitagsrunde",
              answer: "ja"
            },
            {
              _id: 21,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 21,
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          _id: 3,
          thesis: "Leon for presidente",
          answers: [
            {
              _id: 31,
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              _id: 31,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 31,

              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          _id: 4,
          thesis: "Mehr für Weniger",
          answers: [
            {
              _id: 41,
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              _id: 41,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 41,
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          _id: 5,
          thesis: "Mehr Arbeitsräume für Mathematiker",
          answers: [
            {
              _id: 51,
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              _id: 51,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 51,
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          _id: 6,
          thesis: "Schmeißt die Mathematiker raus",
          answers: [
            {
              _id: 61,
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              _id: 61,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 61,
              name: "AStA",
              answer: "neutral"
            }
          ]
        },
        {
          _id: 7,
          thesis: "Soll Mathe grundsätzlich abgeschafft werden?",
          answers: [
            {
              _id: 71,
              name: "Freitagsrunde",
              answer: "nein"
            },
            {
              _id: 71,
              name: "EB301",
              answer: "ja"
            },
            {
              _id: 71,
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
      <ResultPage v-else-if="displayedComponent === 'resultPage'" :results="lastElectionResult"></ResultPage>
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

.page-headline {
  text-align: center;
  margin: 2rem;
  font-size: 25px;
  color: #fff;
}
</style>
