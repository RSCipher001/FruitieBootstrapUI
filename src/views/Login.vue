<template>
  <b-container>
    <h1 class="text-center title">Login</h1>
    <b-form @submit.prevent="login">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="user.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import Axios from "axios";
import apiConfig from "../config/api.config";
export default {
  data() {
    return {
      user: {
        name: null,
        password: null
      },
      validationErrors: {}
    };
  },

  methods: {
    login: async function() {
      try {
        this.$store.commit("startLoading");
        const {
          data: { token, user }
        } = await Axios.post(`${apiConfig.baseUrl}/api/login`, {
          email: this.user.email,
          password: this.user.password
        });
        this.$store.dispatch("login", { user, token });
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.validationErrors = e.response.data;
        } else if (
          e.response &&
          e.response.data.errors &&
          e.response.data.errors.length
        ) {
          e.response.data.errors.forEach(error => {
            this.$store.dispatch("showToast", {
              vm: this,
              message: error.message,
              type: "danger"
            });
          });
        } else {
          this.$store.dispatch("showToast", {
            vm: this,
            message: "Unable to login",
            type: "danger"
          });
        }
      } finally {
        this.$store.commit("stopLoading");
      }
    },

    hasValidationError(key) {
      return this.validationErrors[key] && this.validationErrors[key].length;
    },

    getValidationError(key) {
      if (this.hasValidationError(key)) {
        return this.validationErrors[key][0];
      }
    },

    getInputType(key) {
      if (this.hasValidationError(key)) {
        return "is-danger";
      }
      return null;
    }
  }
};
</script>
