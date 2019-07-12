<script>
import ResultComponent from "../elements/ResultComponent";

export default {
  components: { ResultComponent },
  name: "ResultPage",
  props: ["results"],
  data() {
    return {
      heading: "DEIN ERGEBNIS",
      sortedResults: [],
      openedComponent: 0,
      panelsJsonifiable: true
    };
  },
  created() {
    let sortedResults = this.results.sort((a, b) => b.result - a.result);

    // Incredibly ugly hack that makes it possible to save panel infos
    // and request them from the backend without having a route for it
    // by saving the panel name as a JSON string with "name" and "info"
    // properties and converting it here. If the conversion fails, the
    // old lorem ipsum info texts will be used instead
    let sortedResultsCache = [];

    sortedResults.forEach(sortedResult => {
      try {
        sortedResultsCache.push(sortedResult);
        let json = JSON.parse(sortedResult.panel);
        sortedResult.panel = json;
      } catch (e) {
        this.panelsJsonifiable = false;
      }
    });

    this.sortedResults = this.panelsJsonifiable ? sortedResults : sortedResultsCache;
  }
};
</script>

<template>
  <div class="content" style>
    <h1>{{ heading }}</h1>
    <div>
      <ResultComponent
        v-for="(result, index) in sortedResults"
        :key="index"
        :percentage="result.result.toPrecision(4)"
        :name="panelsJsonifiable ? result.panel.name : result.panel"
        :info="panelsJsonifiable ? result.panel.info : rsult.info"
        :isOpened="openedComponent === index"
        @open="openedComponent = index"
      />
    </div>
    <div class="info-link-container">
      <router-link class="link-button" :to="`/info/wheretovote`">Wo kann ich wählen?</router-link>
      <router-link class="link-button" :to="`/info/whentovote`">Wann kann ich wählen?</router-link>
    </div>
  </div>
</template>

<style scoped>
.info-link-container {
  display: flex;
  flex-direction: column;
}
</style>
