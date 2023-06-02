<template>
  <header>
    <div class="container py-3 gap-3 d-flex justify-content-between align-items-center">
      <a class="navbar-brand d-flex">
        <img src="../../assets/img/doggo.svg" alt="Logo" width="100" class="d-inline-block align-text-center pb-2" />
        <h3 class="align-self-end">GoodBoi</h3>
      </a>

      <div class="user-container align-self-end">
        <h6 v-if="!showLogout" @mouseenter="showLogout = true">{{ getName }}</h6>
        <h6 v-else @mouseleave="showLogout = false">
          <a href="#" class="text-decoration-none text-reset" @click="logout">Logout</a>
        </h6>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "HeaderDashboard",

  data() {
    return {
      showLogout: false,
    };
  },

  computed: {
    getName() {
      return localStorage.getItem("username");
    },
  },

  methods: {
    ...mapMutations(["setAuthToken"]),

    logout() {
      localStorage.clear();
      this.setAuthToken(null);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

header {
  .user-container {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      fill: #fff;
    }
  }
}
</style>
