<template>
  <div class="form p-4 bg-light" @submit.prevent="save">
    <div id="input-group-rating" class="form-group mb-4">
      <label>Your rating:</label>
      <StarRating
        :show-rating="false"
        :star-size="25"
        :rating="form.rating"
        @rating-selected="setRating"
      />
      <b-alert
        v-if="$v.form.rating.$dirty && $v.form.rating.$invalid"
        variant="danger"
        class="mt-3"
        :show="true"
        >Please select your rating</b-alert
      >
    </div>
    <div id="input-group-comment" class="form-group mb-4">
      <label for="input-comment">Your comment (optional):</label>
      <textarea
        class="form-control"
        id="input-comment"
        v-model.lazy="form.comment"
      ></textarea>
    </div>
    <b-button type="submit" variant="success">Send</b-button>
    <div v-if="reviewAddError" class="mt-4">
      <b-alert :show="true" variant="danger">{{ reviewAddError }}</b-alert>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { required, between } from "vuelidate/lib/validators";
import { addReview } from "../../services/reviews";

export default {
  components: {
    StarRating
  },
  props: {
    sessionId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    form: { rating: 0, comment: "" },
    reviewAdded: false,
    reviewAddError: ""
  }),
  validations: {
    form: {
      rating: {
        required,
        between: between(1, 5)
      }
    }
  },
  methods: {
    setRating: function(rating) {
      this.form.rating = rating;
      this.$v.form.rating.$touch();
    },
    save: async function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        await addReview(this.sessionId, this.form.rating, this.form.comment);
        this.showSuccessMessage();
        this.$v.$reset();
        this.resetForm();
      } catch (err) {
        this.reviewAddError = err.message;
        console.log(err);
      }
    },
    resetForm: function() {
      this.form = { rating: 0, comment: "" };
    },
    showSuccessMessage: function() {
      this.$bvToast.toast("Review has been added", {
        title: "Success",
        variant: "success",
        toaster: "b-toaster-top-center",
        autoHideDelay: 3000
      });
    }
  }
};
</script>
