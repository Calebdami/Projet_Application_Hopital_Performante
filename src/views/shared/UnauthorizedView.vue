<template>
    <div class="unauthorized">
        <h1>⛔ Accès refusé</h1>
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>

        <button @click="goBack">Retour</button>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    function goBack() {
        router.back()
    }
</script>

<style scoped>
    .unauthorized {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        text-align: center;
    }

    button {
        padding: 10px 20px;
        border: none;
        background: #1f2937;
        color: white;
        border-radius: 6px;
        cursor: pointer;
    }
</style>
