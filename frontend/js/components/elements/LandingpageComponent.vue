<script>
export default {
name: "landingpageComponent",
props: ["gremium", "name"],
};
</script>

<template>
 <div class = "box">
    <div class ="content">

     <div class = "wahl"> {{ gremium }} </div>
     <div class = "wahl"> {{ name }} </div>
     <button class= "button wahl" @click="$emit('start')"> Starten </button>
     <a href="http://lmgtfy.com/?q=Wo+kann+ich+w%C3%A4hlen%3F">Informieren</a>


    </div>
 </div> 
</template>

<style scoped>
.box {
    background-color: #fff;
    width: 80%;
    /* max-width: 80%; */
    /* max-height: 80%; */
    border-radius: 10px;
    margin: 30px;
}

.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
}
.wahl {
    margin-bottom: 10px;
    color: #333;
    font-size: 20px;

}
.button {
    font-size: 16px;
    background: linear-gradient(135deg, #eae2d2 0, #d9ceb0);
    color: #333;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    padding: 2px 5px 2px 5px;
}
a:link {
  font-size: 12px;
  color: #333;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a:visited {
  color: #333;
}

</style> 