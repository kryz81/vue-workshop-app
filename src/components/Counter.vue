<template>
  <div>
    <span>Counter: {{ count }}</span>
    <button @click="increase" class="btn btn-sm btn-primary">increase</button>
  </div>
</template>

<script>
export default {
  props: {
    initial: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increase: function() {
      if (this.count === this.max) {
        return;
      }
      this.count++;
      this.$emit("counterIncrease", this.count);
    }
  },
  mounted() {
    this.count = this.initial;
  }
};
</script>
