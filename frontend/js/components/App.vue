<script>
import Steckbrief from "./Steckbrief";
import VueSwing from "vue-swing";

// Vue.component('vue-swing', VueSwing)

export default {
  components: { Steckbrief, VueSwing },
  data() {
    return {
      pagenum: 0,
      thesen: [],
      wahlname: "",
      gremium: "",
      firstName: "",
      age: 0,
      config: {
        // throwOutConfidence: 0.5
      }
    };
  },
  computed: {
    currThese() {
      if (this.thesen[this.pagenum]) return this.thesen[this.pagenum].these;
      else return "";
    }
  },
  created() {
    fetch("api/json", { headers: { "content-type": "application/json" } })
      .then(response => response.json())
      .then(wahl => {
        this.thesen.push(...wahl.thesen);
        this.wahlname = wahl.name;
        this.gremium = wahl.gremium;
      });
  },
  methods: {
    fetchAge() {
      this.age = Math.random() * 100;
    },
    throwout() {
      console.log("Just threw a card out :)");
    },
    throwin() {
      console.log("Just threw one in!");
    }
  }
};
</script>
<template>
  <div style="display:flex">
    <h1>Wahl-o-Mat</h1>
    <h2>{{ wahlname }}</h2>
    <h3>{{ gremium }}</h3>
    <p>{{ currThese }}</p>
    <button v-if="pagenum < thesen.length - 1" @click="pagenum += 1">next</button>
    <div>This is a small test</div>
    <input type="text" v-model="firstName">
    <button @click="fetchAge">fetch</button>
    <Steckbrief :firstName="firstName" lastName="Obermeier" :age="age"/>
    <vue-swing @throwout="throwout" @throwin="throwin" :config="config">
      <div v-for="these in thesen" class="box">
        <div>These:</div>
        <div>{{ these.these }}</div>
        <div style="display:flex;"> 
          <div v-for="antwort in these.antworten">
            <div style="font-weight:bold;margin:10px;">{{ antwort.name }}</div>
            <div>{{ antwort.antwort }}</div>
          </div>
        </div>
      </div>
    </vue-swing>
  </div>
</template>
<style scoped>
.box {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background: white;
  border-radius: 3px;
  padding: 1.2em;
  width: 80%;
}
</style>
