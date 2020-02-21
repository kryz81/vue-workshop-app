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
    <div v-if="!sessions || sessions.length === 0">
      No planned sessions yet.
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getUserByEmail } from "../services/user";
import { getSessionsByIdAndGroup } from "../services/sessions";
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
    ...mapState(["mode", "user"])
  },
  methods: {
    ...mapActions(["setError"])
  },
  async mounted() {
    if (!this.user) {
      await this.$router.push("/");
    }

    try {
      this.loading = true;
      const currentUser = await getUserByEmail(this.user.email);

      if (!currentUser) {
        throw new Error("Invalid user");
      }

      this.sessions = await getSessionsByIdAndGroup(
        currentUser.plannedSessions
      );
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
