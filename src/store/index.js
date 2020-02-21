import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const TOGGLE_MODE = "TOGGLE_MODE";
export const SET_ERROR = "SET_ERROR";
export const SET_USER = "SET_USER";

export const MODE_DARK = "dark";
export const MODE_LIGHT = "light";

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    mode: MODE_LIGHT,
    errorMessage: "",
    userName: ""
  },
  mutations: {
    TOGGLE_MODE(state) {
      state.mode = state.mode === MODE_LIGHT ? MODE_DARK : MODE_LIGHT;
    },
    SET_ERROR(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    SET_USER(state, userName) {
      state.userName = userName;
    }
  },
  actions: {
    toggleMode({ commit }) {
      commit(TOGGLE_MODE);
    },
    setError({ commit }, message) {
      commit(SET_ERROR, message);
    },
    setUser({ commit }, userName) {
      commit(SET_USER, userName);
    }
  },
  modules: {}
});
