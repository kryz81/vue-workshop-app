<template>
  <div>
    <div v-if="loading">Loading session...</div>
    <div v-if="session">
      <h4 class="mb-4">{{ session.title }}</h4>
      <b-row>
        <b-col :cols="reviews.length > 0 ? '7' : '12'">
          <p>{{ session.description }}</p>
          <p class="mt-5">
            <strong>
              <router-link
                :to="{ name: 'AddSessionReview', params: { sessionId: id } }"
                ><b-icon icon="star-half"></b-icon> Write a review</router-link
              ></strong
            >
          </p>
        </b-col>
        <b-col v-if="reviews.length > 0" cols="5">
          <ReviewsList :reviews="reviews" />
          <div v-if="reviews.length > 0 && reviewsTotal > reviews.length">
            <router-link
              :to="{ name: 'SessionReviews', params: { sessionId: id } }"
              >Show all reviews</router-link
            >
          </div>
        </b-col>
      </b-row>
      <router-view name="session" :sessionId="id" />
    </div>
  </div>
</template>

<script>
import { getSessionById } from "../services/sessions";
import { getReviewsBySessionId } from "../services/reviews";
import ReviewsList from "./ReviewsList";

export default {
  components: {
    ReviewsList
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    session: undefined,
    reviews: [],
    reviewsTotal: 0,
    loading: false
  }),
  async mounted() {
    try {
      this.loading = true;
      const sessionRes = await getSessionById(this.id);
      this.session = sessionRes.data;
      const reviewsRes = await getReviewsBySessionId(this.id, 2);
      this.reviews = reviewsRes.data;
      this.reviewsTotal = reviewsRes.headers["x-total-count"];
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
};
</script>
