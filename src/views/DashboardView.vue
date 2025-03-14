<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProtectedData, logout } from '@/services/api';
import { useRouter } from 'vue-router';


const protectedMessage = ref('');
const router = useRouter();

onMounted(async () => {
    try {
        const response = await getProtectedData();
        protectedMessage.value = response.message;
    } catch (error) {
        protectedMessage.value = 'Unauthorized';
    }
});

const handleLogout = () => {
    logout();  // Remove token
    router.push('/login');  // Redirect to login page
};
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <p>{{ protectedMessage }}</p>
    </div>
    <div>
        <button @click="handleLogout">Logout</button>
    </div>
</template>
