<template>
  <div class="home">
    <div class="container">
    <div class="d-flex justify-content-center">
      <div class="border py-4 px-5 rounded">
        <h4 class="py-4 px-2">User details</h4>
          <label for="name" class="form-label">Name</label>
          <input
              type="name"
              v-model="name"
              class="form-control"
              id="name"
              placeholder="Enter your name"
              readonly
            />
          <label for="name" class="form-label">Email</label>
          <input
              type="name"
              v-model="email"
              class="form-control"
              id="name"
              placeholder="Enter your name"
              readonly
            />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    getUserDetails() {
      const authData = JSON.parse(localStorage.getItem("authData"));
      this.name = authData.user.name;
      this.email = authData.user.email;
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>
