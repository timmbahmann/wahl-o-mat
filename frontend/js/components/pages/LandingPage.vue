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
    fetch("/wahl", {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(result => (this.electionNames = result.names.map(x => x.name)));
  }
};
</script>
<template>
  <div class="landing-page-container content">
    <img src="landingpage_logo.png" style="width:100%" />
    <p class="headline">der Technischen Universität Berlin.</p>
    <p class="bodytext">
      Hier findest du alle anstehenden Wahlen. Nützliche Infolinks zum Wählen an der TU im Allgemeinen,
      wo die Wahllokale zu finden sind, etc. gibt es am Ende der Seite.
    </p>
    <div class="election-container">
      <LandingPageComponent
        v-for="electionName in electionNames"
        :key="electionName"
        :electionName="electionName"
        @start="requestStart"
      />
    </div>
    <router-link class="link-button" :to="`/info/wheretovote`">Wo kann ich wählen?</router-link>
    <router-link class="link-button" :to="`/info/whentovote`">Wann kann ich wählen?</router-link>
  </div>
</template>
<style scoped>
@media (min-width: 600px) {
  .election-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.headline {
  font-size: 25px;
}

.bodytext {
  margin: 10px 20px 20px 20px;
  color: #fff;
  text-align: center;
  align-content: center;
}

.landing-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  align-self: center;
}
</style>

