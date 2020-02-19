<template>
  <div>
    <div v-if="loading">Loading sessions...</div>
    <b-list-group>
      <b-list-group-item v-for="session in sessions" :key="session.id">
        <div class="d-flex w-100 justify-content-between">
          <h5>
            <router-link :to="`/sessions/${session.id}`">{{
              session.title
            }}</router-link>
          </h5>
          <strong>DAY {{ session.day }}</strong>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <div>{{ session.tutor }}</div>
          <small>{{ session.startDate }} - {{ session.endDate }}</small>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { getSessions } from "../services/sessions";

export default {
  data: () => ({
    sessions: [],
    loading: false
  }),
  async mounted() {
    try {
      this.loading = true;
      const res = await getSessions();
      this.sessions = res.data;
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
};
</script>
