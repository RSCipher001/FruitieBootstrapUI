import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    loggedIn: false,
    token: null,
    user: null
  },
  mutations: {
    login(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.loggedIn = true;
      return state;
    },
    logout(state) {
      state.loggedIn = false;
      state.token = false;
      state.user = null;
      return state;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    }
  },
  actions: {
    login(context, { user, token }) {
      localStorage.setItem("auth", JSON.stringify({ user, token }));
      context.commit("login", { user, token });
    },
    logout(context) {
      localStorage.removeItem("auth");
      context.commit("logout");
    },
    showToast(_, { vm, type = "success", duration = 4000, message }) {
      vm.$bvToast.toast(message, {
        title: "BootstrapVue Toast",
        variant: type,
        autoHideDelay: duration
      });
    }
  },
  modules: {}
});
