<template>
    <RouterView/>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import Autentication from '../components/Autentication.vue';
import Dashborad from '../components/Dashborad.vue';
import { onMounted } from 'vue';

    export default {
        name: 'Home',

        components: {Autentication, Dashborad},


        computed: {
            ...mapGetters(["getAuthToken"])
        },

        methods: {
            ...mapMutations(["setAuthToken"])
        },

        watch: {
            getAuthToken(){
                this.$router.push(this.getAuthToken ? '/dashboard' : '/');
            }
        },

        created(){
            const token = localStorage.getItem('authToken');
            if(token){
                this.setAuthToken(token);
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>