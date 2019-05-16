import Vue from "vue";
import App from "./components/App";

const app = new Vue({
    el: '#app',
    render: x => x(App)
});