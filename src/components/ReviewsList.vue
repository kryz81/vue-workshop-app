<template>
  <div v-if="reviews.length">
    <b-card
      v-for="review in reviews"
      :key="`review${review.id}`"
      class="bg-light mb-3"
    >
      <b-card-text class="mb-1">
        <StarRating
          :read-only="true"
          :show-rating="false"
          :star-size="15"
          :rating="review.rating"
        />
      </b-card-text>
      <b-card-text class="mt-2 mb-1"
        ><small>{{ review.added | moment("YYYY-MM-DD") }}</small></b-card-text
      >
      <b-card-text v-if="review.comment"
        ><small>{{ review.comment }}</small></b-card-text
      >
    </b-card>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { REVIEWS_DEFAULT_LIMIT } from "../services/reviews";

export default {
  components: {
    StarRating
  },
  props: {
    reviews: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      required: false,
      default: REVIEWS_DEFAULT_LIMIT
    }
  }
};
</script>

<style scoped>
.card-body {
  padding: 0.5rem;
  line-height: 1.25rem;
}
</style>
