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
      openedComponent: 0
    };
  },
  created() {
    this.sortedResults = this.results.sort((a, b) => b.result - a.result);
  }
};
</script>

<template>
  <div class="content" style="">
    <h1>{{ heading }}</h1>
    <div>
      <ResultComponent
        v-for="(result, index) in sortedResults"
        :key="index"
        :percentage="result.result.toPrecision(4)"
        :name="result.panel"
        :info="result.info"
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
