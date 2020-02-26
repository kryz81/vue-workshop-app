<template>
  <b-form
    class="p-4"
    :class="mode === MODE_LIGHT ? 'bg-light' : 'bg-dark'"
    @submit.prevent="login"
  >
    <b-form-group
      id="input-group-email"
      label="Your e-mail"
      label-for="input-email"
      class="mb-4"
    >
      <b-form-input id="input-email" v-model.lazy="form.email"></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-password"
      label="Your password"
      label-for="input-password"
      class="mb-4"
    >
      <b-form-input
        id="input-password"
        type="password"
        v-model.lazy="form.password"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="success">Log in</b-button>
    <div class="mt-4 login-error" v-if="loginError">
      <b-alert :show="true" variant="danger">{{ loginError }}</b-alert>
    </div>
  </b-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { login } from "../../services/login";
import { MODE_LIGHT } from "../../store";

export default {
  data: () => ({
    form: { email: "", password: "" },
    loginError: "",
    MODE_LIGHT
  }),
  computed: {
    ...mapState(["mode"])
  },
  methods: {
    ...mapActions(["setUser"]),
    login: async function() {
      this.loginError = "";
      if (this.form.login === "" || this.form.password === "") {
        return;
      }

      try {
        const userData = await login(this.form.email, this.form.password);
        if (!userData) {
          this.loginError = "Invalid credentials";
          return;
        }
        this.setUser({ name: userData.name, email: userData.email });
        await this.$router.push("/");
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};
</script>
