<template>
    <header>

        <div class="container">

            <div class="user-container py-3 gap-3 d-flex justify-content-end align-items-center">
                <img src="../../assets/img/user.jpeg" alt="user">
                <h3>Nome Cognome</h3>
            </div>

        </div>

    </header>
</template>

<script>
    export default {
        name: 'HeaderDashboard'
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