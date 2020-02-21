<template>
  <div class="h-100 main" :class="mode">
    <Header />
    <b-container>
      <b-row>
        <b-col>
          <b-alert :show="errorMessage !== ''" variant="danger">{{
            errorMessage
          }}</b-alert>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/Header";

export default {
  components: {
    Header
  },
  computed: {
    ...mapState(["mode", "errorMessage"])
  }
};
</script>

<style scoped>
.main.dark {
  background-color: #777;
  color: #fff;
}

.main.light {
  background-color: #fff;
  color: #000;
}
</style>
