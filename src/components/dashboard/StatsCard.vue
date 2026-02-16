<template>
    <div class="card">
        <h4>{{ title }}</h4>
        <p class="value">{{ value }}</p>
    </div>
</template>

<script setup>
    defineProps({
        title: String,
        value: [String, Number]
    })
</script>

<style scoped>
    .card {
        background: white;
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .value {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>
