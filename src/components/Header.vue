<template>
  <div class="navbar mb-4 navbar-dark bg-info navbar-expand-sm">
    <div class="container">
      <div class="navbar-brand mr-5">
        <router-link to="/"><strong>Conference Tracker</strong></router-link>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/about"
            ><span class="fas fa-question-circle"></span> About
          </router-link>
        </li>
        <li class="nav-item ml-4">
          <router-link to="/sessions"
            ><span class="fas fa-list-alt"></span> Sessions
          </router-link>
        </li>
      </ul>
    </div>
    <Counter :initial="2" :max="5" />
  </div>
</template>

<script>
import Counter from "./Counter";

export default {
  components: {
    Counter
  }
};
</script>

<style scoped>
a strong,
li a {
  color: #fff;
}
</style>
