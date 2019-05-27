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
      pagenum: 0,
      thesen: [],
      wahlname: "",
      gremium: "",
      displayedComponent: "landingPage"
    };
  },
  computed: {
    currThese() {
      if (this.thesen[this.pagenum]) return this.thesen[this.pagenum].these;
      else return "";
    }
  },
  created() {
    fetch("api/json", { headers: { "content-type": "application/json" } })
      .then(response => response.json())
      .then(wahl => {
        this.thesen.push(...wahl.thesen);
        this.wahlname = wahl.name;
        this.gremium = wahl.gremium;
      });
  },
  methods: {
    showLandingPage() {
      this.displayedComponent = "landingPage";
    },
    showWahlomat() {
      this.displayedComponent = "wahlomat";
    },
    showResultPage() {
      this.displayedComponent = "resultPage";
    }
  }
};
</script>
<template>
  <div>
    <div>
      <button @click="showLandingPage">Startseite</button>
      <button @click="showWahlomat">Thesenansicht</button>
      <button @click="showResultPage">Ergebnisseite</button>
    </div>
    <LandingPage v-if="displayedComponent === 'landingPage'"></LandingPage>
    <Wahlomat v-else-if="displayedComponent === 'wahlomat'"></Wahlomat>
    <ResultPage v-else-if="displayedComponent === 'resultPage'"></ResultPage>
  </div>
</template>