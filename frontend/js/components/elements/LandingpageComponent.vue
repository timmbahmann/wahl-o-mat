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
    fetch(`/api/wahl/${encodeURIComponent(this.electionName)}`, {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(election => (this.election = election[0]));
  }
};
</script>

<template>
  <div class="box">
    <div class="content">
      <div class="wahl">{{ election.name }}</div>
      <router-link class="button" :to="`/app/${election.name}`">
        Starten
        <!-- <button class="button wahl" @click="start">Starten</button> -->
      </router-link>
      <a class="link-button" href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F">Informieren</a>
    </div>
  </div>
</template>

<style scoped>
.box {
  background-color: rgba(255, 255, 255, 0.16);
  width: 90%;
  padding: 15px;
  word-wrap: break-word;
  border-radius: 10px;
  margin: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wahl {
  margin-bottom: 10px;
  color: #fff;
  font-size: 20px;
}
.button {
  font-size: 20px;
  background: linear-gradient(135deg, #b88724 0, #a87b00);
  color: black;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  padding: 10px;
  text-decoration: none;
}
</style> 