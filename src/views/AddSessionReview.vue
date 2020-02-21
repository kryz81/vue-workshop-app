<template>
  <SessionReviewForm :sessionId="sessionId" />
</template>

<script>
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
  }
};
</script>
