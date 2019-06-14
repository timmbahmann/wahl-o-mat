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
  <div class="bodytext">
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
    <div>
      <p>
        <a href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F">Wo kann ich wählen?</a>
      </p>
      <p>
        <a href="http://lmgtfy.com/?q=Wann+kann+ich+w%C3%A4hlen%3F">Wann kann ich wählen?</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.bodytext {
  font-family: Helvetica;
  text-align: center;
  color: white;
}
a:link {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a:visited {
  color: white;
}
</style>
