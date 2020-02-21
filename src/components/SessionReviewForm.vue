<template>
  <b-form
    class="p-4"
    :class="mode === MODE_LIGHT ? 'bg-light' : 'bg-dark'"
    @submit.prevent="save"
  >
    <b-form-group
      id="input-group-mark"
      label="Your note:"
      label-for="input-mark"
      class="mb-4"
    >
      <StarRating
        :show-rating="false"
        :star-size="25"
        :rating="form.mark"
        @rating-selected="setRating"
      />
    </b-form-group>
    <b-form-group
      id="input-group-content"
      label="Your review (optional):"
      label-for="input-content"
      class="mb-4"
    >
      <b-form-textarea
        id="input-content"
        v-model.lazy="form.content"
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
    form: { mark: undefined, content: "" },
    reviewAdded: false,
    reviewAddError: "",
    MODE_LIGHT
  }),
  computed: {
    ...mapState(["mode"])
  },
  methods: {
    setRating: function(rating) {
      this.form.mark = rating;
    },
    save: async function() {
      if (!this.form.mark) {
        alert("Select a mark");
      }
      try {
        await addReview(this.sessionId, this.form.mark, this.form.content);
        this.showSuccessMessage();
        this.resetForm();
      } catch (err) {
        this.reviewAddError = err.message;
        console.log(err);
      }
    },
    resetForm: function() {
      this.form = { mark: 0, content: "" };
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
