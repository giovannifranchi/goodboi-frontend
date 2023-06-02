<template>
<router-view v-slot="{ Component }">
  <transition name="bounce">
    <component :is="Component"/>
  </transition>
</router-view>
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

<style lang="scss" scoped>

.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
