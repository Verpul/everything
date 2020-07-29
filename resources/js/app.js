import Vue from "vue";
import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

require('./plugins/axios');

Vue.use(Vuelidate);


new Vue({
  store,
  router,
  vuetify,
  created() {
    store.dispatch("loadUserData", localStorage.getItem("token"));
  },
  render: h => h(App)
}).$mount("#app");
