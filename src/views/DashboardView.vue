<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProtectedData } from '@/services/api';

const protectedMessage = ref('');

onMounted(async () => {
    try {
        const response = await getProtectedData();
        protectedMessage.value = response.message;
    } catch (error) {
        protectedMessage.value = 'Unauthorized';
    }
});
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <p>{{ protectedMessage }}</p>
    </div>
</template>
