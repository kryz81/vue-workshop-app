<template>
  <div>
    <h4 class="mt-4 mb-2">All Session Reviews</h4>
    <div v-if="loading">Loading session reviews...</div>
    <ReviewsList v-if="reviews.length" :reviews="reviews" />
  </div>
</template>

<script>
import { getReviewsBySessionId } from "../services/reviews";
import ReviewsList from "../components/ReviewsList";

export default {
  components: {
    ReviewsList
  },
  props: {
    sessionId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    reviews: [],
    loading: false
  }),
  async mounted() {
    try {
      this.loading = true;
      const reviewsRes = await getReviewsBySessionId(this.sessionId);
      this.reviews = reviewsRes.data;
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
};
</script>
