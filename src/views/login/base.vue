<template>
    <div class="page-container">
        <RouterView></RouterView>
    </div>
</template>

<style lang="scss" scoped>
.page-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/resources/login-background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>