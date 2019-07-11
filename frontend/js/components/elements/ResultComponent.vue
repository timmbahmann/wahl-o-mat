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
    <div class="parent" @click="$emit('open')">
      <div class="child" :style="{width: `${percentage}%`}">
        <div class="name">{{name}}</div>
        <!-- <div class="percentage">{{percentage}}</div> -->
      </div>
      <div class="percentage">{{percentage}}</div>
    </div>
    <div :class="isOpened ? 'accordion-content-opened' : 'accordion-content'">
      <div class="info-text">{{info}}</div>
    </div>
  </div>
</template>

<style scoped>
.parent {
  width: 90%;
  background: var(--elevation-basic-bg);
  border-radius: 5px;
  min-height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.parent:hover {
  background: var(--elevation-elevated-bg);
  box-shadow: var(--elevation-elevated-shadow);
}

.child {
  background: var(--primary);
  border-radius: 5px;
  text-align: left;
  align-items: center;
  margin: 2px;
  display: flex;
  justify-content: space-between;
}

.name {
  margin: 10px;
}

.percentage {
  align-self: center;
  margin-right: 10px;
  right: 13%;
  position: absolute;
}

@media (min-width: 600px) {
  .percentage {
    position: absolute;
    right: calc(50% - 225px);
    margin-left: 10px;
  }
}

.info-text {
  margin: 15px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1px 5px 10px 5px;
  max-width: 500px;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.2s linear;
}

.accordion-content-opened {
  margin: 10px 0px 15px 0px;
  max-height: auto;
  background: var(--elevation-elevated-bg);
  box-shadow: var(--elevation-elevated-shadow);
  border-radius: 4px;
  width: 90%;
}
</style>