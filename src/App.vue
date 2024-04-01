<template>
  <notifications />
  <nav>
    <router-link to="/">Registration</router-link> |
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <button
      class="btn btn-light font-weight-bold"
      v-if="isLoggedIn"
      @click="logout"
    >
      Logout
    </button>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.loggedIn;
    },
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      const token = localStorage.getItem("authData");
      this.loggedIn = token !== null;
    },
    logout() {
      localStorage.removeItem("authData");
      this.loggedIn = false;
      this.$router.push("/login");
    },
  },
};


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
