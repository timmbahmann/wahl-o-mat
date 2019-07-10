
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
      <div class="box-headline">Wann kann ich wählen?</div>
      <div class="box-content">
        <div>
          Die Wahlen zum 40. Studierendenparlament finden vom 17. bis zum 21.Juni statt.
          An diesen Tagen sind die Wahllokale jeweils von 9:30 Uhr bis 16:30 Uhr für euch geöffnet.
        </div>
      </div>
      <router-link class="link-button" :to="`/`">Zurück</router-link>
    </div>
  </div>
</template>