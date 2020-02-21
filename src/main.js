import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueScrollTo from "vue-scrollto";
import VueMoment from "vue-moment";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueScrollTo);
Vue.use(VueMoment);

Vue.directive("highlight", {
  bind(el, binding) {
    if (binding.value) {
      el.style.color = "#009688";
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
