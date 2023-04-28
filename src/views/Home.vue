<template>
    <Autentication v-if="currentPage === 0"/> <!-- TODO: it has to be changed with v-if="!user" -->
    <Dashborad v-else/>
</template>

<script>
import axios from 'axios';
import Autentication from '../components/Autentication.vue';
import Dashborad from '../components/Dashborad.vue';

    export default {
        name: 'Home',

        components: {Autentication, Dashborad},

        data(){
            return {
                currentPage: 1,
                isUser: false,
            }
        },

        methods: {
            changePage(){
                this.currentPage === 0 ? this.currentPage = 1 : this.currentPage = 0;
            }
        },

        // This is going to be the authentication call
        // async created(){
        //     try{
        //         const result = await axios.post()
        //         this.isUser = true
        //     }catch {
        //         this.isUser = false;
                
        //     }
        // }


    }
</script>

<style lang="scss" scoped>

</style>