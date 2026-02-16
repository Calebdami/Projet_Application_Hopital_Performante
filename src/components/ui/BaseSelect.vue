<template>
    <select class="base-select" v-bind="$attrs">
        <slot />
    </select>
</template>

<style scoped>
    .base-select {
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        width: 100%;
    }
</style>
