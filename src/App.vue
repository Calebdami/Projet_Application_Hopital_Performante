<template>
    <router-view />
</template>

<script setup>
// App.vue reste volontairement léger.
// Toute la structure de l’application est gérée par Vue Router et les layouts.
</script>

<style>
    /* Styles globaux simples */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, sans-serif;
        background: #f3f4f6;
        color: #111827;
    }
</style>
