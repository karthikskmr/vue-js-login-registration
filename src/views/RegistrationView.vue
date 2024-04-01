<template>
  <div class="">
    <div class="container">
    <div class="col-md-12">
      <div class="d-flex justify-content-center ">
      <div class="border py-5 px-5 rounded">
        <h4 class=" py-4 px-5">User Registration</h4>
        <form @submit.prevent="userRegistration()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="name"
              v-model="name"
              class="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div class="mb-3">
            <label for="password_confirmation" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              v-model="password_confirmation"
              class="form-control"
              id="password_confirmation"
              placeholder="Enter your confirm password"
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
            <span v-else>Register</span>
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
  name: "HomeView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
    };
  },
  methods: {
    async userRegistration() {
      try {
        this.loading = true;
        await axios.post(process.env.VUE_APP_URL + "/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        this.$notify({
          text: "Register Successful",
          type: "success",
        });
        this.$router.push("login");
      } catch (error) {
        let notificationText = "";

        Object.keys(error.response.data).forEach((key) => {
          const errorMessages = error.response.data[key];

          errorMessages.forEach((errorMessage) => {
            notificationText += `${
              key.charAt(0).toUpperCase() + key.slice(1)
            }: ${errorMessage}. `;
          });
        });

        this.$notify({
          text: notificationText,
          type: "warn",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
