<script>
import Steckbrief from "./Steckbrief";

export default {
  components: { Steckbrief },
  data() {
    return {
      pagenum: 0,
      thesen: [],
      wahlname: "",
      gremium: "",
      firstName: "",
      age: 0
    };
  },
  computed: {
    currThese() {
      if (this.thesen[this.pagenum]) return this.thesen[this.pagenum].these;
      else return "";
    }
  },
  created() {
    fetch("/json", { headers: { "content-type": "application/json" } })
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
    }
  }
};
</script>
<template>
  <div>
    <h1>Wahl-o-Mat</h1>
    <h2>{{ wahlname }}</h2>
    <h3>{{ gremium }}</h3>
    <p>{{ currThese }}</p>
    <button v-if="pagenum < thesen.length - 1" @click="pagenum += 1">next</button>
    <div>This is a small test</div>
    <input type="text" v-model="firstName">
    <button @click="fetchAge">fetch</button>
    <Steckbrief :firstName="firstName" lastName="Obermeier" :age="age"/>
  </div>
</template>
