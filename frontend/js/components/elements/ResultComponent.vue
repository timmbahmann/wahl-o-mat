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
      <div class="wrapperPercentage">
        <div
          style="display: inline-block; float: right; padding: 4px; color: #3e573a; font-family: Helvetica"
        >{{percentage+'%'}}</div>
        <div :class="isOpened?'result-opened':'result'" v-bind:style="{width:percentage+'%'}">
          <div style="display: inline-block; color: #d9ceb0; font-family: Helvetica">{{name}}</div>
        </div>
      </div>
    </button>

    <div :class="isOpened?'accordion-content-opened':'accordion-content'">
      <p class="content">{{info}}</p>
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

.accordion {
  border-radius: 5px;
  padding: 2px;
  width: 100%;
  background-color: #d9ceb0;
  text-align: left;
  cursor: pointer;
  border: none;
}

.content {
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
  background: linear-gradient(135deg, #90a76c 0, #768c54);
  border-radius: 4px;
  padding: 5px;
}

.accordion-content-opened {
  margin: 10px 0px 15px 0px;
  max-height: auto;
  background: linear-gradient(0deg, #e1d9c1 0, #d9ceb0);
  border-radius: 4px;
  width: 100%;
}

.result-opened {
  background: linear-gradient(135deg, #697c4a 0, #4e5c37);
  border-radius: 4px;
  padding: 5px;
  transition: all 0.1s linear;
}
</style>