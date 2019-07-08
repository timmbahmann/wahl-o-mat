<script>
export default {
  name: "resultComponent",
  props: ["percentage", "info", "name", "isOpened"],
  data() {
    return {};
  }
};
</script>
<template>
  <div class="container">
    <button @click="$emit('open')" class="accordion">
      <div>
        <div class="result-percentage">{{percentage+'%'}}</div>
        <div :class="isOpened ? 'result-opened' : 'result'" :style="{width:percentage + '%'}">
          <div class="result-text">{{name}}</div>
        </div>
      </div>
    </button>

    <div :class="isOpened ? 'accordion-content-opened' : 'accordion-content'">
      <p class="info-content">{{info}}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1px 5px 10px 5px;
}

.result-text {
  display: inline-block;
  color: white;
  font-weight: bold;
  top: 9px;
  position: relative;
  margin: 0px 10px;
}

.result-percentage {
  float: right;
  padding: 4px;
  color: white;
  font-weight: bold;
  position: relative;
  top: 6px;
}

.accordion {
  border-radius: 5px;
  padding: 2px;
  width: 90%;
  /* height: 45px; */
  background-color: rgba(255, 255, 255, 0.16);
  text-align: left;
  cursor: pointer;
  border: none;
  padding: 0px 5px;
}

.info-content {
  margin: 15px 10px 10px 10px;
  font-family: Helvetica;
  color: #333;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.2s linear;
}

.result {
  background: var(--primary-gradient);
  opacity: 0.6;
  border-radius: 4px;
  /* height: 32px; */
}

.accordion-content-opened {
  margin: 10px 0px 15px 0px;
  max-height: auto;
  background: linear-gradient(0deg, #e1d9c1 0, #d9ceb0);
  border-radius: 4px;
  width: 90%;
}

.result-opened {
  background: var(--primary-gradient);
  border-radius: 4px;
  transition: all 0.1s linear;
  /* height: 32px; */
}
</style>