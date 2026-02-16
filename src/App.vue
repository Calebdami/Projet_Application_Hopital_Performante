<script setup></script>


<template>
    <h1>Bonjour les gars nous sommes là</h1>
    <router-link to="patients">Patient</router-link>
    <router-link to="doctors">Doctors</router-link>
    <router-link to="appointments">Appointments</router-link>
    <router-link to="rooms">Rooms</router-link>

    <main>
        <router-view></router-view>
    </main>
</template>


<style scoped>


</style>