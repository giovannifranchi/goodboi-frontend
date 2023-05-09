<template>
    <header>

        <div class="container">

            <div class="user-container py-3 gap-3 d-flex justify-content-end align-items-center">
                <h3>{{ getUsername }}</h3>
            </div>

        </div>

    </header>
</template>

<script>
import { mapGetters } from 'vuex';

    export default {
        name: 'HeaderDashboard',

        computed: {
            ...mapGetters(["getUsername"]),
        }
    }
</script>

<style lang="scss" scoped>
@use '../../assets/partials/variables' as *;

header {
    background-color: $header-color;
    .user-container {
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}
}
</style>