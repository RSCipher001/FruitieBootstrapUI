<template>
  <section>
    <h1 class="text-center title">Register</h1>
    <form @submit.prevent="register">
      <b-field
        label="Name"
        :type="getInputType('name')"
        :message="getValidationError('name')"
      >
        <b-input
          type="text"
          value=""
          has-counter
          maxlength="64"
          v-model="user.name"
          required
        >
        </b-input>
      </b-field>

      <b-field
        label="Email"
        :type="getInputType('email')"
        :message="getValidationError('email')"
      >
        <b-input
          type="email"
          maxlength="64"
          has-counter
          v-model="user.email"
          required
        >
        </b-input>
      </b-field>

      <b-field
        label="Password"
        :type="getInputType('password')"
        :message="getValidationError('password')"
      >
        <b-input
          v-model="user.password"
          type="password"
          has-counter
          maxlength="72"
          password-reveal
          required
        >
        </b-input>
      </b-field>

      <b-field
        label="Password Confirmation"
        :type="getInputType('password_confirmation')"
        :message="getValidationError('password_confirmation')"
      >
        <b-input
          v-model="user.password_confirmation"
          type="password"
          has-counter
          maxlength="72"
          password-reveal
          required
        >
        </b-input>
      </b-field>

      <b-field>
        <b-checkbox required>I accept terms</b-checkbox>
      </b-field>
      <div class="buttons">
        <b-button native-type="submit" class="is-fullwidth" type="is-primary"
          >Register</b-button
        >
      </div>
      <div class="field has-text-centered">
        <b-button tag="router-link" to="/login" type="is-white">
          Login instead?
        </b-button>
        <!-- <small class="text-muted mx-1 d-none d-md-inline">|</small> -->
      </div>
    </form>
  </section>
</template>

<script>
import Axios from "axios";
import apiConfig from "../config/api.config";
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      validationErrors: {}
    };
  },
  methods: {
    register: async function() {
      try {
        this.$store.commit("startLoading");
        await Axios.post(`${apiConfig.baseUrl}/api/register`, {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation
        });
      } catch (e) {
        if (e.response.status === 422) {
          this.$store.dispatch("showToast", {
            vm: this,
            message: "Validation Error",
            type: "danger"
          });
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
