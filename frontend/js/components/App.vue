<script>
import LandingPage from "./LandingPage";
import Wahlomat from "./Wahlomat";
import ResultPage from "./ResultPage";
import VueSwing from "vue-swing";

export default {
  components: {
    LandingPage,
    Wahlomat,
    ResultPage,
    VueSwing
  },
  data() {
    return {
      pagenum: 0,
      thesen: [],
      wahlname: "",
      gremium: "",
      firstName: "",
      age: 0,
      config: {},
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
      <Wahlomat v-else-if="displayedComponent === 'wahlomat'" :thesen="thesen"></Wahlomat>
      <ResultPage v-else-if="displayedComponent === 'resultPage'"></ResultPage>
    </div>
  </div>
</template>
<style>
body {
  background-color:#262626;
}
</style>
