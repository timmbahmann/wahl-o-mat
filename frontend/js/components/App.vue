<template>
  <div id="app">
    <router-view></router-view>
    <div id="impressum">
      <div>Built with ❤ at TU Berlin</div>
      <div>
        <a href="https://github.com/timmbahmann/wahl-o-mat">Source</a> on GitHub
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
:root {
  --primary: #b88724;
  --primary-gradient: linear-gradient(135deg, var(--primary) 0, #c08308);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: Bahnschrift, Helvetica, sans-serif;
}

body {
  margin: 0;
  background-color: #121212;
}

#impressum {
  margin: 10px;
  padding: 5px;
  color: white;
  border-top: 1px solid #ffffff22;
}

.link-button {
  font-size: 17px;
  color: var(--primary);
  margin: 5px;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.link-button:hover {
  background-color: #ffffff22;
}

.content {
  padding: 8%;
  min-height: 100vh;
}

.box {
  border: 1px solid #ffffff99;
  border-radius: 10px;
  padding: 20px;
}

.box-headline {
  font-size: 17px;
}

.box-content {
  opacity: 0.6;
  margin: 15px 5px;
  text-align: left;
}

.button {
  font-size: 17px;
  background: var(--primary);
  color: black;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  padding: 8px;
  text-decoration: none;
}
</style>