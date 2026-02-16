<template>
    <button class="base-btn">
        <slot/>
    </button>
</template>

<style scoped>
    .base-btn {
        padding: 8px 14px;
        border: none;
        background: #111827;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.2s;
    }

    .base-btn:hover {
        opacity: 0.9;
    }
</style>
