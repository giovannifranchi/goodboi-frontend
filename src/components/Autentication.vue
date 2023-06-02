<template>
  <div class="d-flex align-items-center justify-content-center wrapper flex-column py-5">
    <div class="w-25">
      <img src="../assets/img/doggo.svg" alt="logo" class="img-fluid">
    </div>
    <h1 class="mb-5">GoodBoi</h1>
    <form @submit.prevent="login(query)">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="query.username"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="query.password" />
      </div>
      <button type="submit" class="btn ms-button w-100 mt-3 fs-4">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";




export default {
  name: "Authentication",

  data() {
    return {
      query: {
        username: '',
        password: '',
      }
    };
  },

  computed: {
    ...mapGetters(['getAuthToken'])
  },

  methods: {
    ...mapActions(['login']),
    ...mapMutations(['setAuthToken']),

  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variables" as *;
.wrapper {
  height: 100vh;
  background-color: $primary-blue;
  
  .ms-button {
    background-color: $header-color;
    color: #fff;
    &:hover{
      background-color: lighten($color: $header-color, $amount: 10%);

    }
  }
}
</style>
