<script>
import landingpageComponent from "./landingpageComponent";
import Wahlomat from "./Wahlomat";

export default {
  components: { landingpageComponent, Wahlomat },
  data() {
    return {
      displayedComponent: "landingPage",
      election: {},

    }
  },
  methods: {
      switchPage(page) {
      this.displayedComponent = page;
    },
  }
};

</script>
<template>
 
  <div class = "bodytext content">
   <h1>Startseite</h1>
      <p class ="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
         sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
         aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
         duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata 
         sanctus est Lorem ipsum dolor sit amet.
      </p>


    <landingpageComponent gremium = "fakrat"  name="wahl 2019" @start="switchPage('Wahlomat')" />
     <p>
       <a href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F">Wo kann ich wählen?</a> 
     </p>
     <p>
       <a href="http://lmgtfy.com/?q=Wann+kann+ich+w%C3%A4hlen%3F">Wann kann ich wählen?</a>
     </p>
  </div>
  
     
</template>
<style scoped>

  .bodytext {
    font-family: Helvetica;
    color: white;
  }
  .text{
    
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  a:link {
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    color: white;
  }

</style>

