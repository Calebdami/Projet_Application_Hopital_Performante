<template>
    <div v-if="patient" class="patient-detail">
        <h2>Détail du patient</h2>

        <div class="patient-card">
            <header class="card-header">
                <div class="avatar"> {{ patient.firstName.charAt(0) }}{{ patient.lastName.charAt(0) }}</div>
                <div class="identity">    
                    <h3>{{ patient.firstName }} {{ patient.lastName }}</h3>
                    <span class="badge-status" :class="patient.status.toLowerCase().replace(' ', '-')">{{ patient.status }}</span>
                </div>
                <div class="room-info">
                    <small>Chambre</small>
                    <p>{{ patient.roomNumber || 'N/A' }}</p>
                </div>
            </header>
            <div class="card-body">
                <section class="info-group vital-signs">
                    <div class="data-item">
                        <span class="label">Groupe Sanguin</span>
                        <span class="value blood">{{ patient.bloodGroup }}</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Allergies</span>
                        <span class="value alert">{{ patient.allergies || 'Aucune' }}</span>
                    </div>
                </section>

                <section class="info-group">
                    <h4><i class="icon-med"></i>Médical</h4>
                    <div class="grid-data">
                        <div class="data-item">
                            <span class="label">Antécédents</span>
                            <span class="value">{{ patient.antecedantMajeurs || 'N/A' }}</span>
                        </div>
                        <div class="data-item">
                            <span class="label">Traitements en cours</span>
                            <span class="value">{{ patient.medicamentEnCours || 'N/A' }}</span>
                        </div>
                    </div>
                </section>

                <section class="info-group">
                    <h4><i class="icon-user"></i> Infos & Contact</h4>
                    <div class="grid-data">
                        <div class="data-item">
                            <span class="label">Genre</span>
                            <span class="value">{{ patient.gender === 'male' ? 'Homme' : 'Femme' }}</span>
                        </div>
                        <div class="data-item">
                            <span class="label">Profession</span>
                            <span class="value">{{ patient.profession }}</span>
                        </div>
                        <div class="data-item">
                            <span class="label">Téléphone</span>
                            <span class="value">{{ patient.phone || 'Non renseigné' }}</span>
                        </div>
                        <div class="data-item">
                            <span class="label">Langues</span>
                            <span class="value">{{ patient.languages.join(', ') }}</span>
                        </div>
                    </div>
                </section>

                <section class="info-group admin-footer">
                <div class="data-item">
                    <span class="label">Prise en charge</span>
                    <span class="value">{{ patient.priseEnCharge === 'oui' ? '✅ Oui' : '❌ Non' }}</span>
                </div>
                <div class="data-item">
                    <span class="label">ID Docteur</span>
                    <span class="value">#{{ patient.doctorId }}</span>
                </div>
                </section>
            </div>
            <footer class="card-footer">
                <small>Enregistré le : {{ formatDate(patient.createdAt) }}</small>
            </footer>
        </div>

        <button @click="goBack">Retour</button>
    </div>

    <p v-else>Patient introuvable.</p>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { usePatients } from '@/composables/usePatients'
    import { formatDate } from '@/utils/helpers'

    const route = useRoute()
    const router = useRouter()

    const { patients } = usePatients()

    const patient = computed(() => patients.value.find(p => p.id == route.params.id))

    function goBack() { router.back() }
</script>

<style scoped>
    .patient-detail {
        padding: 20px;
    }

    .patient-card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-left: 5px solid #3498db; /* Couleur thématique médicale */
        max-width: 450px;
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
    }

    .card-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: #f8f9fa;
        gap: 15px;
    }

    .avatar {
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .identity h3 {
        margin: 0;
        color: #2c3e50;
    }

    .badge-status {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 20px;
        background: #eee;
    }

    .badge-status.en-attente { background: #ffeaa7; color: #d35400; }
    .badge-status.hospitalisé { background: #55efc4; color: #00b894; }

    .room-info {
        margin-left: auto;
        text-align: right;
        border-left: 1px solid #ddd;
        padding-left: 15px;
    }

    .card-body { padding: 20px; }

    .info-group { margin-bottom: 20px; }

    .info-group h4 {
        font-size: 0.9rem;
        color: #7f8c8d;
        text-transform: uppercase;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .grid-data {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .data-item { display: flex; flex-direction: column; }

    .label { font-size: 0.8rem; color: #95a5a6; }

    .value { font-weight: 500; color: #34495e; font-size: 0.95rem; }

    .value.alert { color: #e74c3c; font-weight: bold; }

    .value.blood {
        background: #e74c3c;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        width: fit-content;
    }

    .admin-footer {
        display: flex;
        justify-content: space-between;
        background: #f1f2f6;
        padding: 10px;
        border-radius: 8px;
    }

    .card-footer {
        padding: 10px 20px;
        background: #f8f9fa;
        color: #bdc3c7;
        text-align: center;
    }

    button {
        padding: 8px 16px;
        background: #111827;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
</style>
