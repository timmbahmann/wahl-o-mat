<script>
export default {
  created() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      election: null,
      panels: null,
      panelsJsonifiable: true
    };
  },
  created() {
    fetch(`/wahl/${encodeURIComponent(this.$route.params.election)}`, {
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(election => {
        this.election = election[0];
        return election[0].thesen
          .map(x => x.antworten)[0]
          .map(x => (x ? x.name : null));
      })
      .then(panels => {
        // Incredibly ugly hack that makes it possible to save panel infos
        // and request them from the backend without having a route for it
        // by saving the panel name as a JSON string with "name" and "info"
        // properties and converting it here. If the conversion fails, the
        // old lorem ipsum info texts will be used instead
        let panelCache = [];
        panels.forEach(panel => {
          try {
            panelCache.push(JSON.parse(panel))
          } catch (e) {
            this.panelsJsonifiable = false;
          }

          this.panels = this.panelsJsonifiable ? panelCache : panels;
        })
      });
  }
};
</script>
<template>
  <div class="content">
    <div style="font-size:30px;margin-bottom:20px">{{election? election.name : ''}} - Listen</div>
    <div v-for="panel in panels" :key="panel.name" class="box">
      <div class="box-headline">{{panelsJsonifiable ? panel.name : panel}}</div>
      <div
        class="box-content"
      >{{panelsJsonifiable ? panel.info : 'Morbi eleifend tellus ac leo sodales, dictum sagittis nisi tincidunt. Curabitur ut laoreet enim. Proin porta condimentum nulla ac tempor. Suspendisse vel ante diam. Fusce posuere, justo nec rutrum ultricies, enim urna fringilla dolor, id varius tellus libero semper nunc. Cras non dui elementum, suscipit quam et, vehicula justo. Pellentesque rutrum vestibulum dolor in finibus. Integer tempor scelerisque mollis. Ut eget venenatis nisl. Proin tristique ipsum eget felis condimentum feugiat.'}}</div>
    </div>
    <router-link class="link-button" :to="`/`">Zurück</router-link>
  </div>
</template>