<template>
  <div>
    <div v-if="loading">Loading sessions...</div>
    <div v-if="sessions">
      <SessionDays v-if="days.length" :days="days" />
      <div class="mt-4" v-for="day in days" :key="`day${day}`">
        <h5 :id="`day${day}`">DAY {{ day }}</h5>
        <b-list-group>
          <b-list-group-item
            v-for="session in sessions[day]"
            :key="session.id"
            :class="`bg-${mode}`"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5>
                <router-link
                  :to="`/sessions/${session.id}`"
                  v-highlight="session.sponsored"
                  >{{ session.title }}</router-link
                >
              </h5>
              <strong>Room {{ session.room }}</strong>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <div>{{ session.tutor }}</div>
              <small>{{ session.startDate }} - {{ session.endDate }}</small>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getAndGroupSessionsByDay } from "../services/sessions";
import SessionDays from "./SessionDays";

export default {
  components: {
    SessionDays
  },
  data: () => ({
    sessions: undefined,
    days: [],
    loading: false
  }),
  computed: {
    ...mapState(["mode"])
  },
  methods: {
    ...mapActions(["setError"])
  },
  async mounted() {
    try {
      this.loading = true;
      this.sessions = await getAndGroupSessionsByDay();
      this.days = Object.keys(this.sessions).sort(Number);
    } catch (err) {
      this.setError(`Cannot load sessions. Error: ${err.message}`);
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
};
</script>
