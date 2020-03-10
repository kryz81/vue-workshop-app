<template>
  <div>
    <ReviewForm :sessionId="sessionId" />
  </div>
</template>

<script>
import ReviewForm from "../components/reviews/ReviewForm";

export default {
  components: {
    ReviewForm
  },
  props: {
    sessionId: {
      type: String,
      required: true
    }
  }
};
</script>
