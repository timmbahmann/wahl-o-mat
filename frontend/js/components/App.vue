<script>
import LandingPage from "./pages/LandingPage";
import Wahlomat from "./pages/Wahlomat";
import ResultPage from "./pages/ResultPage";

import * as PageManager from "../helpers/PageManager";

export default {
  components: {
    LandingPage,
    Wahlomat,
    ResultPage
  },
  data() {
    return {
      displayedComponent: PageManager.LANDINGPAGE,
      activeElection: null,
      activeElectionResult: null
    };
  },
  methods: {
    switchPage(page) {
      this.displayedComponent = page;
    },
    showLandingPage() {
      this.activeElection = null;
      this.activeElectionResult = null;
      this.switchPage(PageManager.LANDINGPAGE);
    },
    startWahlomat(election) {
      this.activeElection = election;
      this.switchPage(PageManager.WAHLOMAT);
    },
    showResults(results) {
      this.activeElectionResult = results;
      this.switchPage(PageManager.RESULTPAGE);
    }
  }
};
</script>
<template>
  <div>
    <div>
      <LandingPage v-if="displayedComponent === 'landingpage'" @wahlomatRequested="startWahlomat"></LandingPage>
      <Wahlomat
        v-else-if="displayedComponent === 'wahlomat'"
        :election="activeElection"
        @finished="showResults"
      ></Wahlomat>
      <ResultPage v-else-if="displayedComponent === 'resultpage'" :results="activeElectionResult"></ResultPage>
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
