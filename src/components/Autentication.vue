<template>
  <div class="d-flex align-items-center justify-content-center wrapper flex-column py-5">
    <!-- <AutoTypingComponent /> -->
    <div class="w-25">
      <img src="../assets/img/doggo.svg" alt="logo" class="img-fluid">
    </div>
    <h1 class="mb-5">GoodBoi</h1>
    <form @submit.prevent="logintry(query)">
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
      <button type="submit" class="btn btn-primary">login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AutoTypingComponent from "./AutoTypingComponent.vue";


export default {
  name: "Authentication",

  components: { AutoTypingComponent },

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

    logintry(query){ //TODO: refactoring required for semantic names and optimization
      
      this.login(query);
    }

  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variables" as *;
.wrapper {
  height: 100vh;
  background-color: $primary-blue;
}
</style>
