<template>
    <HeaderDashboard/>
    <MainDashboardVue/>
</template>

<script>
import HeaderDashboard from './Dashboard/HeaderDashboard.vue';
import MainDashboardVue from './Dashboard/MainDashboard.vue';



    export default {
        name: 'Dashboard',

        components: { HeaderDashboard, MainDashboardVue },
    }
</script>

<style lang="scss" scoped>


</style>