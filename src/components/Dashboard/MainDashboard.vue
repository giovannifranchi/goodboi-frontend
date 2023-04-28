<template>
    <main>
        <div class="container">
            <StatsComponentVue/>
        </div>
    </main>
</template>

<script>
import StatsComponentVue from '../general/StatsComponent.vue';


    export default {
        name: 'MainDashboard',

        components: {StatsComponentVue},
    }
</script>

<style lang="scss" scoped>
@use '../../assets/partials/variables' as *;

main {
    background-color: $header-color;
}
</style>