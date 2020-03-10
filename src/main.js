import Vue from "vue";
import VueMoment from "vue-moment";
import Vuelidate from "vuelidate";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";

Vue.config.productionTip = false;

Vue.use(VueMoment);
Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
