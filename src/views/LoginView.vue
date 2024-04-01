<template>
  <div class="home">
    <div class="container">
      <div class="col-md-12">
      <div class="d-flex justify-content-center ">
      <div class="border py-5 px-5 rounded">
        <h4 class="text-center py-2 px-2">User Login</h4>
        <form @submit.prevent="userLogin()">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      isLoggin:false
    };
  },
  methods: {
    async userLogin() {
      this.loading = true;
      const response = await axios.post(
        process.env.VUE_APP_URL + "/api/login",
        {
          email: this.email,
          password: this.password,
        }
      );
      if (response.data.message) {
        const error = "Login Failed  " + response.data.message;
        this.$notify({
          text: error,
          type: "warn",
        });
        console.error(response.data.message);
        this.loading = false;
      } else {
        localStorage.setItem("authData", JSON.stringify(response.data));

        this.loading = false;
        this.$router.push({ path: "/home" });
        this.$notify({
          text: "Login Successful",
          type: "success",
        });
      }
    },
  },
  created(){
    this.isLoggin =  localStorage.getItem('authData') !== null ? true:false;
    if(this.isLoggin){
      this.$router.push('/home')
    }
  }
};
</script>
