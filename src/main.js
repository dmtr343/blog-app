import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  render: (h) => h(App),
}).$mount("#app");
