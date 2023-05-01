<template>
    <Autentication v-if="getAuthToken === undefined || getAuthToken === null"/> <!-- TODO: it has to be changed with v-if="!user" -->
    <Dashborad v-else/>
</template>

<script>

import { mapGetters } from 'vuex';
import Autentication from '../components/Autentication.vue';
import Dashborad from '../components/Dashborad.vue';

    export default {
        name: 'Home',

        components: {Autentication, Dashborad},

        data(){
            return {
                currentPage: 0,
                isUser: false,
            }
        },

        computed: {
            ...mapGetters(["getAuthToken"])
        },

    }
</script>

<style lang="scss" scoped>

</style>