<script>
import ResultComponent from "../elements/ResultComponent";
export default {
  components: { ResultComponent },
  name: "ResultPage",
  props: ["results"],
  data() {
    return {
      heading: "DEIN ERGEBNIS",
      engagedComponent: 0
    };
  },
  methods: {
    sorted: function(arr) {
      return arr.slice().sort(function(a, b) {
        return b.percentage - a.percentage;
      });
    }
  }
};
</script>

<template>
  <div class="bodytext">
    <h1>{{ heading }}</h1>
    <div>
      <ResultComponent
        v-for="(result, index) in sorted(results)"
        :key="index"
        :percentage="result.percentage"
        :name="result.name"
        :info="result.info"
        :isOpened="index == openedComponent"
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
