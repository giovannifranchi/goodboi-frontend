<template>
  <div class="d-flex align-items-center justify-content-center wrapper flex-column">
    <!-- <AutoTypingComponent /> -->
    <h1 class="mb-5">GoodBoi</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">login</button>
    </form>
  </div>
</template>

<script>
import AutoTypingComponent from "./AutoTypingComponent.vue";
import axios from "axios";

export default {
  name: "Authentication",

  components: { AutoTypingComponent },

  data() {
    return {
      username: "",
      password: "",
      authToken: null
    };
  },

  methods: {
    login() {
      const endpoint = "http://65.108.85.188:3000/api/login";

      const payload = {
        username: this.username,
        password: this.password,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      axios.post(endpoint,payload, {headers}).then((result) => {
        this.authToken = result.data.token;
        this.username = '';
        this.password = '';
      });



    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variables" as *;
.wrapper {
  height: 100vh;
  background-color: $header-color;
}
</style>
