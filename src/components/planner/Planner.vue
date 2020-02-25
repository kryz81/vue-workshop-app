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
            <div class="d-flex w-100 justify-content-end" v-if="user">
              <a @click="removeFromPlanned(session.id)">
                <b-icon icon="trash" variant="danger" />
              </a>
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
import { ref, computed, onMounted } from "@vue/composition-api";
import { getUserByEmail } from "../../services/user";
import {
  removeFromPlannedSessions,
  getSessionsByIdAndGroup
} from "../../services/sessions";
import SessionDays from "../sessions/SessionDays";

export default {
  components: {
    SessionDays
  },
  // setup called after "beforeCreate" and before "created"
  setup(props, { root: { $router, $store, $bvToast } }) {
    // create reactive properties
    const loading = ref(false);
    const sessions = ref([]);
    const days = ref([]);

    // create computed properties
    const mode = computed(() => $store.state.mode);
    const user = computed(() => $store.state.user);

    async function getSessionsAndDays() {
      const currentUser = await getUserByEmail($store.state.user.email);

      if (!currentUser) {
        throw new Error("Invalid user");
      }

      sessions.value = await getSessionsByIdAndGroup(
        currentUser.plannedSessions
      );
      days.value = Object.keys(sessions.value).sort(Number);
    }

    function showSuccessMessage() {
      $bvToast.toast("Session has been removed from your planner", {
        title: "Success",
        variant: "success",
        toaster: "b-toaster-top-center",
        autoHideDelay: 3000
      });
    }

    // create methods
    async function removeFromPlanned(sessionId) {
      if (!user) {
        return;
      }
      try {
        await removeFromPlannedSessions(this.user.email, sessionId);
        showSuccessMessage();
        await getSessionsAndDays();
      } catch (err) {
        console.log(err);
      }
    }

    // onMount lifecycle method
    onMounted(async () => {
      if (!user) {
        await $router.push("/");
      }

      try {
        loading.value = true;
        await getSessionsAndDays();
      } catch (err) {
        $store.actions.setError(`Cannot load sessions. Error: ${err.message}`);
        console.error(err);
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
      sessions,
      days,
      mode,
      user,
      removeFromPlanned
    };
  }
};
</script>
