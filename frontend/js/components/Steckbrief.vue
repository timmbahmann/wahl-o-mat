<script>
export default {
  name: "Steckbrief",
  props:[("firstName", "lastName", "age")],
  data() {
    return {};
  }
};
</script>
<template>
  <div>
    <div>Vorname: {{firstName}}</div>
    <div>Nachname: {{lastName}}</div>
    <div>Alter: {{age}}</div>
  </div>
</template>
