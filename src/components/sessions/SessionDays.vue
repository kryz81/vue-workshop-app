<template>
  <div class="mt-4 mb-4">
    Show only:
    <button
      v-for="day in days"
      :key="day"
      class="btn btn-sm mr-1 ml-1"
      :class="{
        'btn-primary': day === selectedDay,
        'btn-secondary': day !== selectedDay
      }"
      @click="$emit('filter', day)"
    >
      DAY {{ day }}
    </button>
    <a href="" @click.prevent="$emit('clear-filter')">[clear filter]</a>
  </div>
</template>

<script>
export default {
  props: {
    days: {
      type: Array,
      required: true
    },
    selectedDay: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
a {
  margin-left: 15px;
}
</style>
