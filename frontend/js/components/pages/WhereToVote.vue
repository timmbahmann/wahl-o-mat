<script>
export default {
  created() {
    window.scrollTo(0, 0);
  }
};
</script>
<template>
  <div class="content">
    <div class="box">
      <div class="box-headline">Wo kann ich wählen?</div>
      <div class="box-content">
        <div>
          Die Wahllokale sind im Foyer des Hauptgebäudes – Bereich 0H.
          Eine weitere Option ist die Briefwahl, die wandernden Briefwahllokale stehen euch zur verfügung:
        </div>
        <ul>
          <li>von Montag bis Donnerstag im Foyer des Gebäudes Marchstraße (MAR)</li>
          <li>am Montag auf dem TIB-Gelände, TIB 13B</li>
          <li>am Dienstag und Mittwoch in der Mensa, sowie</li>
          <li>am Donnerstag in der Bibliothek</li>
        </ul>
      </div>
      <router-link class="link-button" :to="`/`">Zurück</router-link>
    </div>
  </div>
</template>