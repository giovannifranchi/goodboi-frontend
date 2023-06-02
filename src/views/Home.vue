<template>
 <RouterView/>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Autentication from "../components/Autentication.vue";
import Dashborad from "../components/Dashborad.vue";
import { RouterView } from "vue-router";

export default {
  name: "Home",

  components: { Autentication, Dashborad },

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
    
    const token = localStorage.getItem('authToken');
    if(token){
        this.setAuthToken(token);
    }
    this.$router.push(this.getAuthToken ? '/dashboard' : '/login');

  },
};
</script>

<style lang="scss" scoped></style>
