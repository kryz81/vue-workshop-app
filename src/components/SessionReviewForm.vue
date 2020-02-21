<template>
  <b-form
    class="p-4"
    :class="mode === MODE_LIGHT ? 'bg-light' : 'bg-dark'"
    @submit.prevent="save"
  >
    <b-form-group
      id="input-group-rating"
      label="Your rating:"
      label-for="input-rating"
      class="mb-4"
    >
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
    </b-form-group>
    <b-form-group
      id="input-group-comment"
      label="Your comment (optional):"
      label-for="input-comment"
      class="mb-4"
    >
      <b-form-textarea
        id="input-comment"
        v-model.lazy="form.comment"
      ></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="success">Send</b-button>
    <div v-if="reviewAddError" class="mt-4">
      <b-alert show variant="danger">{{ reviewAddError }}</b-alert>
    </div>
  </b-form>
</template>

<script>
import { mapState } from "vuex";

import StarRating from "vue-star-rating";
import { required, between } from "vuelidate/lib/validators";
import { addReview } from "../services/reviews";
import { MODE_LIGHT } from "../store";

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
    reviewAddError: "",
    MODE_LIGHT
  }),
  computed: {
    ...mapState(["mode", "userName"])
  },
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
      if (!this.userName) {
        await this.$router.push("/");
      }

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
