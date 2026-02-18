<script setup>
// App.vue reste volontairement léger.
// Toute la structure de l’application est gérée par Vue Router et les layouts.
</script>

<template>
    <div class="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <router-view />
    </div>
</template>

<style>
    /* Importation d'une police sans-serif propre si vous ne l'avez pas déjà configurée */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    body {
    font-family: 'Inter', sans-serif;
    }
</style>