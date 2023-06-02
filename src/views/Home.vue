<template>
  <RouterView />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import { RouterView } from "vue-router";

export default {
  name: "Home",

  data() {
    return {
      currentPage: null,
    };
  },

  computed: {
    ...mapGetters(["getAuthToken"]),
  },

  methods: {
    ...mapMutations(["setAuthToken"]),
  },

  watch: {
    getAuthToken() {
      this.$router.push(this.getAuthToken ? "/dashboard" : "/login");
    },
  },

  created() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.setAuthToken(token);
    }
    this.$router.push(this.getAuthToken ? "/dashboard" : "/login");
  },
};
</script>

<style lang="scss" scoped></style>
