<template>
  <div>
    <div v-if="loading">Loading session...</div>
    <div v-if="session">
      <h4 class="mb-4">{{ session.title }}</h4>
      <p>{{ session.description }}</p>
      <p class="mt-5">
        <strong>
          <router-link
            :to="{ name: 'SessionReview', params: { sessionId: id } }"
            ><b-icon icon="star-half"></b-icon> Write a review</router-link
          ></strong
        >
      </p>
      <router-view name="session" :sessionId="id" />
    </div>
  </div>
</template>

<script>
import { getSessionById } from "../services/sessions";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    session: undefined,
    loading: false
  }),
  async mounted() {
    try {
      this.loading = true;
      const res = await getSessionById(this.id);
      this.session = res.data;
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
};
</script>
