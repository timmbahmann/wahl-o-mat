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
    fetch("/api/json", {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(wahl => {
        console.log(wahl);
        this.election = wahl;
      });
  },
  methods: {
    switchPage(page) {
      this.displayedComponent = page;
    },
    showResults(results) {
      this.lastElectionResult = results;
      this.switchPage("resultPage");
    },
    startWahlomat() {
      this.switchPage("wahlomat");
    }
  }
};
</script>
<template>
  <div>
    <div>
      <LandingPage v-if="displayedComponent === 'landingPage'" @wahlomatRequested="startWahlomat"></LandingPage>
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
