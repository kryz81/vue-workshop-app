<template>
  <Session :id="sessionId" />
</template>

<script>
import Session from "../components/Session";

export default {
  props: {
    sessionId: {
      type: String,
      required: true
    }
  },
  components: {
    Session
  }
};
</script>
