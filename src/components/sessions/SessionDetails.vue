<template>
  <div>
    <div v-if="loading">Loading session...</div>
    <div v-if="session">
      <h4 class="mb-2">{{ session.title }}</h4>
      <div class="row">
        <div :class="reviews.length > 0 ? 'col-7' : 'col-12'">
          <p class="mb-4">{{ session.tutor }}</p>
          <div class="mb-4">
            <div class="badge badge-secondary mr-2">
              ROOM {{ session.room }}
            </div>
            <div class="badge badge-secondary mr-2">DAY {{ session.day }}</div>
            <div class="badge badge-primary">
              {{ session.startDate }} - {{ session.endDate }}
            </div>
          </div>
          <p>{{ session.description }}</p>
          <p class="mt-5">
            <strong>
              <router-link
                :to="{ name: 'AddSessionReview', params: { sessionId: id } }"
                ><span class="fas fa-star"></span> Write a review</router-link
              ></strong
            >
          </p>
        </div>
        <div class="col-5" v-if="reviews.length > 0">
          <ReviewsList :reviews="reviews" />
          <div v-if="reviews.length > 0 && reviewsTotal > reviews.length">
            <router-link
              :to="{ name: 'SessionReviews', params: { sessionId: id } }"
              >Show all reviews</router-link
            >
          </div>
        </div>
      </div>
      <router-view name="session" :sessionId="id" />
    </div>
  </div>
</template>

<script>
import { getSessionById } from "../../services/sessions";
import { getReviewsBySessionId } from "../../services/reviews";
import ReviewsList from "../reviews/ReviewsList";

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
