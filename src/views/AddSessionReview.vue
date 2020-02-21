<template>
  <div>
    <SessionReviewForm v-if="userName" :sessionId="sessionId" />
    <div v-if="!userName">
      <b-alert :show="true">You need to log in to add a review.</b-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SessionReviewForm from "../components/SessionReviewForm";

export default {
  components: {
    SessionReviewForm
  },
  props: {
    sessionId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["userName"])
  }
};
</script>
