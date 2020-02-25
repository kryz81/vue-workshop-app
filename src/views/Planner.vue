<template>
  <div>
    <h4 class="mb-4">Planner</h4>
    <Planner v-if="user" />
    <b-alert :show="true" variant="info" v-if="!user"
      >You need to log in to see your planned sessions.</b-alert
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import Planner from "../components/planner/Planner";

export default {
  components: {
    Planner
  },
  computed: {
    ...mapState(["mode", "user"])
  }
};
</script>
