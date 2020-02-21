<template>
  <div>
    <h4 class="mb-4">Planner</h4>
    <MySessions v-if="userName" />
    <b-alert :show="true" variant="info" v-if="!userName"
      >You need to log in to see your planned sessions.</b-alert
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import MySessions from "../components/MySessions";

export default {
  components: {
    MySessions
  },
  computed: {
    ...mapState(["mode", "userName"])
  }
};
</script>
