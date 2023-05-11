<template>
  <header>
    <div class="container py-3 gap-3 d-flex justify-content-between align-items-center">
      <a class="navbar-brand  d-flex" >
        <img
          src="../../assets/img/logo.png"
          alt="Logo"
          width="100"

          class="d-inline-block align-text-center"
        />
        <h3 class="align-self-end">GoodBoi</h3>
      </a>

      <div class="user-container align-self-start">
        <h6>{{ getName }}</h6>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderDashboard",

  computed: {
    getName() {
      return localStorage.getItem("username");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

header {
  background-color: $header-color;
  .user-container {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
