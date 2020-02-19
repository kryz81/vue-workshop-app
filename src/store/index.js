import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const TOGGLE_MODE = "TOGGLE_MODE";
export const MODE_DARK = "dark";
export const MODE_LIGHT = "light";

export default new Vuex.Store({
  state: {
    mode: MODE_LIGHT
  },
  mutations: {
    TOGGLE_MODE(state) {
      state.mode = state.mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT;
    }
  },
  actions: {
    toggleMode({ commit }) {
      commit(TOGGLE_MODE);
    }
  },
  modules: {}
});
