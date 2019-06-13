<script>
import LandingPageComponent from "../elements/LandingpageComponent";

export default {
  components: { LandingPageComponent },
  data() {
    return {
      electionNames: []
    };
  },
  methods: {
    requestStart(election) {
      this.$emit("wahlomatRequested", election);
    }
  },
  created() {
    fetch("/api/wahl", {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(result => (this.electionNames = result.names.map(x => x.name)));
  }
};
</script>
<template>
  <div class="content">
    <h1>Startseite</h1>
    <p class="bodytext">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
      duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
    </p>
    <LandingPageComponent
      v-for="electionName in electionNames"
      :key="electionName"
      :electionName="electionName"
      @start="requestStart"
    />
    <div>
      <a href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F">Wo kann ich wählen?</a>
    </div>
    <div>
      <a href="http://lmgtfy.com/?q=Wann+kann+ich+w%C3%A4hlen%3F">Wann kann ich wählen?</a>
    </div>
  </div>
</template>
<style scoped>
.bodytext {
  margin: 10px 20px 20px 20px;
  color: #d9ceb0;
  text-align: center;
  align-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font: Helvetica;
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

