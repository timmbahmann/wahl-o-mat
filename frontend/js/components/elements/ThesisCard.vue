<script>
export default {
  name: "ThesisCard",
  props: [
    "distanceFromActiveThesis",
    "thesis",
    "index",
    "totalThesesCount",
    "currentSwipeResult"
  ],
  data() {
    return {};
  },
  methods: {
    computeStyle() {
      return {
        filter: this.distanceFromActiveThesis === 0 ? "none" : "blur(1px)",
        height: 43 + this.distanceFromActiveThesis + "%",
        opacity:
          this.distanceFromActiveThesis <= 3
            ? 1 - this.distanceFromActiveThesis * 0.3
            : 0
      };
    }
  }
};
</script>
<template>
  <div :style="computeStyle()" class="card">
    <div class="card-content">
      <div style="font-size:30px;font-weight:bold;color:#fff">{{currentSwipeResult ? currentSwipeResult.answer : ""}}</div>
      <div style="font-weight:bold;">{{ thesis.these }}</div>
      <div
        style="margin:10px;color:#999;position:absolute;bottom:10px;right:20px;"
      >{{this.index}} / {{this.totalThesesCount}}</div>
    </div>
  </div>
</template>
<style scoped>
.card {
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 40%;
  justify-content: center;
  left: calc(50% - 40%);
  position: absolute;
  top: calc(50% - 40% + 50px);
  width: 80%;
  flex-direction: column;
  text-align: center;
}

.card-content {
  margin: 2rem;
}
</style>