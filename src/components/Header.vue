<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="mb-4">
    <b-container>
      <b-navbar-brand class="mr-5"
        ><router-link to="/"
          ><strong>Conference Tracker</strong></router-link
        ></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about"
            ><b-icon icon="question"></b-icon> About</b-nav-item
          >
          <b-nav-item to="/sessions"
            ><b-icon icon="list-task"></b-icon> Sessions</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
a strong {
  color: #fff;
}
</style>
