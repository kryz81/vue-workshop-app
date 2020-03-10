<template>
  <div class="mt-4 mb-4">
    Show only:
    <b-button
      v-for="day in days"
      :key="day"
      size="sm"
      class="mr-1 ml-1"
      :variant="day === selectedDay ? 'primary' : 'secondary'"
      @click="$emit('filter', day)"
    >
      DAY {{ day }}</b-button
    >
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
