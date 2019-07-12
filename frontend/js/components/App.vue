<template>
  <div id="app">
    <router-view></router-view>
    <div id="impressum">
      <div>Built with ❤ at TU Berlin</div>
      <div>
        <a href="https://github.com/timmbahmann/wahl-o-mat" style="color:white">Source</a> on GitHub
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
  --elevation-basic-bg: rgba(255, 255, 255, 0.1);
  --elevation-basic-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  --elevation-elevated-bg: rgba(255, 255, 255, 0.16);
  --elevation-elevated-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
    0 15px 12px rgba(0, 0, 0, 0.22);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: Bahnschrift, Helvetica, sans-serif;
  width: 100%;
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

#logo {
  max-width: 45em;
  max-height: 8.5em;
  min-height: 4em;
  width: 100%;
  padding-bottom: 1em;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  border: 1px solid #ffffff99;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
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