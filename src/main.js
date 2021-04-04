import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueI18n from "vue-i18n";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import transations from "./i18n";
Vue.use(VueI18n);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "en",
  transations
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created: function() {
    const auth = localStorage.getItem("auth");
    if (auth) {
      this.$store.dispatch("login", JSON.parse(auth));
    }
  }
}).$mount("#app");
