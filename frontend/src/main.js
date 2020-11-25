import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
