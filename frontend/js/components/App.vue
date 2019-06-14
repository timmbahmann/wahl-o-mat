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
      // Add the list info text to the result objects, because the result page needs it to display it
      // TODO: replace dummy text with real info once a backend route for list infos exists
      this.activeElectionResult = results.map(x => {
        x.info =
          "Morbi eleifend tellus ac leo sodales, dictum sagittis nisi tincidunt. Curabitur ut laoreet enim. Proin porta condimentum nulla ac tempor. Suspendisse vel ante diam. Fusce posuere, justo nec rutrum ultricies, enim urna fringilla dolor, id varius tellus libero semper nunc. Cras non dui elementum, suscipit quam et, vehicula justo. Pellentesque rutrum vestibulum dolor in finibus. Integer tempor scelerisque mollis. Ut eget venenatis nisl. Proin tristique ipsum eget felis condimentum feugiat.";
        return x;
      });

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
