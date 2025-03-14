<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/services/api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
        await login({ email: email.value, password: password.value });
        router.push('/dashboard'); // Redirect after login
    } catch (error) {
        errorMessage.value = 'Invalid credentials';
    }
};
</script>

<template>
    <div>
        <h1>Login</h1>
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="handleLogin">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>
