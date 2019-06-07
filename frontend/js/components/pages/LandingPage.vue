<script>
import LandingPageComponent from "../elements/LandingpageComponent";

export default {
  components: { LandingPageComponent },
  data() {
    return {
      election: {}
    };
  },
  methods: {
    startWahlomat() {
      this.$emit("wahlomatRequested", this.election);
    }
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

    <LandingPageComponent gremium="fakrat" name="wahl 2019" @start="startWahlomat"/>
    <p>
      <a href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F">Wo kann ich wählen?</a>
    </p>
    <p>
      <a href="http://lmgtfy.com/?q=Wann+kann+ich+w%C3%A4hlen%3F">Wann kann ich wählen?</a>
    </p>
  </div>
</template>
<style scoped>

.bodytext {
  margin: 10px;
  color: #d9ceb0;
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

