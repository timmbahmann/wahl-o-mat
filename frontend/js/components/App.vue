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
      displayedComponent: "landingPage"
    };
  },
  created() {
    fetch("api/json", { headers: { "content-type": "application/json" } })
      .then(response => response.json())
      .then(election => {
        this.election = election;
      });
  },
  methods: {
    switchPage(page) {
      this.displayedComponent = page;
    }
  }
};
</script>
<template>
  <div>
    <div>
      <div>
        <button @click="switchPage('landingPage')">Startseite</button>
        <button @click="switchPage('wahlomat')">Thesenansicht</button>
        <button @click="switchPage('resultPage')">Ergebnisseite</button>
      </div>
      <LandingPage v-if="displayedComponent === 'landingPage'"></LandingPage>
      <Wahlomat v-else-if="displayedComponent === 'wahlomat'" :election="election"></Wahlomat>
      <ResultPage v-else-if="displayedComponent === 'resultPage'"></ResultPage>
    </div>
  </div>
</template>
<style>
body {
  background-color: #262626;
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
