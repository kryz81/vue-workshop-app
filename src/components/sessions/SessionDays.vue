<template>
  <div class="mt-4 mb-4">
    Go to day:
    <b-button
      v-for="day in days"
      :key="day"
      size="sm"
      class="mr-1 ml-1"
      :variant="mode === MODE_LIGHT ? 'secondary' : 'info'"
      @click="$scrollTo(`#day${day}`)"
    >
      DAY {{ day }}</b-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MODE_LIGHT } from "../../store";

export default {
  props: {
    days: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    MODE_LIGHT
  }),
  computed: {
    ...mapState(["mode"])
  }
};
</script>
