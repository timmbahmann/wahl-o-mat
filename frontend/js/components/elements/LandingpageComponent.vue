<script>
export default {
  name: "landingpageComponent",
  props: ["electionName"],
  data() {
    return {
      election: {}
    };
  },
  methods: {
    start() {
      this.$emit("start", this.election);
    }
  },
  created() {
    fetch(`/wahl/${encodeURIComponent(this.electionName)}`, {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(election => (this.election = election[0]));
  }
};
</script>

<template>
  <div class="card">
    <router-link style="text-decoration:none" :to="`/app/${election.name}`">
      <div class="card-content">
        <!-- <div class="wahl"> -->
        <div class="card-headline">{{ election.name }}</div>
        <div class="card-text">
          <div>{{election.thesen ? election.thesen.length : ""}} Thesen</div>
          <div>|</div>
          <div>{{election.thesen ? election.thesen[0].antworten.length : ""}} Listen</div>
        </div>
        <div class="card-action-area">
          <router-link class="button" :to="`/app/${election.name}`">Starten</router-link>
          <router-link class="link-button" :to="`/info/${election.name}`">Informieren</router-link>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--elevation-basic-bg);
  padding: 15px;
  word-wrap: break-word;
  border-radius: 10px;
  margin: 15px 10px;
  box-shadow: var(--elevation-basic-shadow);
}

.card:hover {
  box-shadow: var(--elevation-elevated-shadow);
  background-color: var(--elevation-elevated-bg);
}

@media (min-width: 600px) {
  .card {
    width: 40%;
  }
}

.card-content {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  text-align: left;
}
.card-headline {
  /* margin-bottom: 20px;
  color: #fff; */
  font-size: 20px;
  color: white;
  opacity: 0.87;
}

.card-text > div {
  display: inline-block;
  opacity: 0.5;
  color: white;
}

.card-action-area {
  margin-top: 15px;
}
</style> 