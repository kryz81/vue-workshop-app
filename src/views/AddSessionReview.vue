<template>
  <div>
    <ReviewForm v-if="user" :sessionId="sessionId" />
    <div v-if="!user">
      <b-alert :show="true">You need to log in to add a review.</b-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
