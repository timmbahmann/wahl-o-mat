//import Vue from "vue";
let Vue = require('vue');

const app = new Vue({
    el: '#app',
    template: `
    <div>
    Leon
        <h1>Wahl-o-Mat</h1>
        <h2>{{ wahlname }}</h2>
        <h3>{{ gremium }}</h3>
        <p>{{ currThese }}</p>
        <button v-if="pagenum < thesen.length - 1" @click="pagenum += 1">next</button>
        <button @click="logData">Log Data</button>
        <div>This is a small test</div>
    </div>
    `,
    data: {
        pagenum: 0,
        thesen: [],
        wahlname: "",
        gremium: ""
    },
    computed: {
        currThese() {
            if (this.thesen[this.pagenum])
                return this.thesen[this.pagenum].these
            else
                return ""
        }
    },
    created() {
        fetch('/json', { headers: { 'content-type': 'application/json' } })
            .then(response => response.json())
            .then(wahl => {
                this.thesen.push(...wahl.thesen)
                this.wahlname = wahl.name
                this.gremium = wahl.gremium
            })
    },
    methods: {
        logData() {
            console.log(this.thesen)
        }
    }
});