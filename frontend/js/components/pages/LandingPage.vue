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
    <img src="landingpage_logo.png" style="width:100%" />
    <p class="bodytext">Willkommen beim Wahl-o-Mat der Technischen Universität Berlin.</p>
    <p class="bodytext">
      Hier findest du alle in der nächsten Zeit anstehenden Wahlen. Nützliche Infolinks zum Wählen an der TU im Allgemeinen,
      wo die Wahllokale zu finden sind, etc. findest du am Ende der Seite.
    </p>
    <LandingPageComponent
      v-for="electionName in electionNames"
      :key="electionName"
      :electionName="electionName"
      @start="requestStart"
    />
    <a
      class="link-button"
      href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F"
    >Wo kann ich wählen?</a>
    <a
      class="link-button"
      href="http://lmgtfy.com/?q=Wann+kann+ich+w%C3%A4hlen%3F"
    >Wann kann ich wählen?</a>
  </div>
</template>
<style scoped>
.bodytext {
  margin: 10px 20px 20px 20px;
  color: #fff;
  text-align: center;
  align-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font: Helvetica;
  align-self: center;
  padding: 8%;
}
</style>

