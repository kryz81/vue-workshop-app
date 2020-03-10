<template>
  <div>
    <div v-if="sessions">
      <SessionDays
        v-if="days.length"
        :days="days"
        :selected-day="selectedDay"
        v-on:filter="filterByDay"
        v-on:clear-filter="clearSelectedDay"
      />
      <div class="mt-4" v-for="day in days" :key="`day${day}`">
        <h5 :id="`day${day}`" v-if="sessions[day]">DAY {{ day }}</h5>
        <b-list-group v-if="sessions[day]">
          <b-list-group-item
            v-for="session in sessions[day]"
            :key="session.id"
            class="bg-light"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5>
                <router-link :to="`/sessions/${session.id}`">{{
                  session.title
                }}</router-link>
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
import { getAndGroupSessionsByDay } from "../../services/sessions";
import SessionDays from "./SessionDays";

export default {
  components: {
    SessionDays
  },
  data: () => ({
    sessions: undefined,
    days: [],
    selectedDay: null
  }),
  methods: {
    showSuccessMessage: function() {
      this.$bvToast.toast("Session has been added to your planner", {
        title: "Success",
        variant: "success",
        toaster: "b-toaster-top-center",
        autoHideDelay: 3000
      });
    },
    filterByDay(day) {
      this.selectedDay = day;
      this.getSessions();
    },
    clearSelectedDay() {
      this.selectedDay = null;
      this.getSessions();
    },
    async getSessions() {
      try {
        const sessions = await getAndGroupSessionsByDay();
        this.days = Object.keys(sessions).sort(Number);
        if (this.selectedDay && sessions[this.selectedDay]) {
          this.sessions = { [this.selectedDay]: sessions[this.selectedDay] };
        } else {
          this.sessions = sessions;
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
  async mounted() {
    this.getSessions();
  }
};
</script>
