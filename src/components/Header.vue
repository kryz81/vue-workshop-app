<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="mb-4">
    <b-container>
      <b-navbar-brand href="/" class="mr-5"
        ><strong>Conference Tracker</strong></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about"
            ><b-icon icon="question"></b-icon> About</b-nav-item
          >
          <b-nav-item to="/sessions"
            ><b-icon icon="list-task"></b-icon> Sessions</b-nav-item
          >
          <b-nav-item to="/planner"
            ><b-icon icon="map"></b-icon> Planner</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button size="sm" class="toggle-mode mr-5" @click="toggleMode"
            >{{ switchToMode }} Mode</b-button
          >
          <b-nav-item v-if="userName" to="/profile"
            ><b-icon icon="person-fill"></b-icon> {{ userName }}</b-nav-item
          >
          <b-nav-item v-if="userName" @click="logout"
            ><b-icon icon="power"></b-icon> Logout</b-nav-item
          >
          <b-nav-item v-if="!userName" to="/login"
            ><b-icon icon="lock-fill"></b-icon> Login</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { MODE_LIGHT } from "../store";

export default {
  methods: {
    ...mapActions(["toggleMode", "setUser"]),
    logout: function() {
      this.setUser();
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["mode", "userName"]),
    switchToMode: function() {
      return this.mode === MODE_LIGHT ? "Dark" : "Light";
    }
  }
};
</script>
