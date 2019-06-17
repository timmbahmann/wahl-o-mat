<script>
// import subpage components
import ThesisSwiper from "./ThesisSwiper";
import ResultPage from "./ResultPage";

// import necessary constants
import { RESULTPAGE, THESISSWIPER } from "../../helpers/Constants"

export default {
  components: {
    ThesisSwiper,
    ResultPage
  },
  data() {
    return {
    displayedComponent: THESISSWIPER,
      activeElection: null,
      activeElectionResult: null,
      pages: { resultPage: RESULTPAGE, thesisSwiper: THESISSWIPER }
    };
  },
  methods: {
    switchPage(page) {
      this.displayedComponent = page;
    },
    startWahlomat(election) {
      this.activeElection = election;
      this.switchPage("");
    },
    showResults(results) {
      // Add the list info text to the result objects, because the result page needs it to display it
      // TODO: replace dummy text with real info once a backend route for list infos exists
      this.activeElectionResult = results.map(x => {
        x.info =
          "Morbi eleifend tellus ac leo sodales, dictum sagittis nisi tincidunt. Curabitur ut laoreet enim. Proin porta condimentum nulla ac tempor. Suspendisse vel ante diam. Fusce posuere, justo nec rutrum ultricies, enim urna fringilla dolor, id varius tellus libero semper nunc. Cras non dui elementum, suscipit quam et, vehicula justo. Pellentesque rutrum vestibulum dolor in finibus. Integer tempor scelerisque mollis. Ut eget venenatis nisl. Proin tristique ipsum eget felis condimentum feugiat.";
        return x;
      });

      this.switchPage(this.pages.resultPage);
    }
  }
};
</script>
<template>
  <ThesisSwiper
    v-if="displayedComponent === pages.thesisSwiper"
    :election="activeElection"
    @finished="showResults"
  ></ThesisSwiper>
  <ResultPage v-else-if="displayedComponent === pages.resultPage" :results="activeElectionResult"></ResultPage>
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
