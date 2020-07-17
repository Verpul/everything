import Vue from "vue";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from './router';
import store from './store';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios = axios;

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");
