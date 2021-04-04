<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Fruitie</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav>
          <b-nav-item to="/integration">Integration</b-nav-item>
          <b-nav-item to="/reddit">Reddit</b-nav-item>
        </b-navbar-nav>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">HI</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown v-if="user" right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-navbar-nav v-else right>
              <b-nav-item to="/login">Login</b-nav-item>
              <b-nav-item to="/register">Register</b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
