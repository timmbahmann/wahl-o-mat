<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  background-color: #121212;
  font-family: Bahnschrift, Helvetica, sans-serif;
}

body {
  margin: 0;
}

.link-button:link {
  font-size: 15px;
  color: #fff;
  margin: 5px;
  text-decoration: underline;
}
.link-button:hover {
  text-decoration: underline;
}
.link-button:visited {
  color: #fff;
}
</style>