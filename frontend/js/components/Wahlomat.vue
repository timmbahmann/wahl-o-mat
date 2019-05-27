<script>
import Steckbrief from "./Steckbrief";

export default {
  components: { Steckbrief },
  data() {
    return {};
  }
};
</script>
<template>
  <div>
    This is the Thesenansicht
    <!-- <h1>Wahl-o-Mat</h1>
    <h2>{{ wahlname }}</h2>
    <h3>{{ gremium }}</h3>
    <p>{{ currThese }}</p>
    <button v-if="pagenum < thesen.length - 1" @click="pagenum += 1">next</button>
    <div>This is a small test</div>
    <input type="text" v-model="firstName">
    <button @click="fetchAge">fetch</button>
    <Steckbrief :firstName="firstName" lastName="Obermeier" :age="age"/> -->
  </div>
</template>