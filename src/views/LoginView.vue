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
        const response = await login({ email: email.value, password: password.value });

        console.log('Login Response:', response);

        localStorage.setItem('token', response.access_token);  // Store token

        setTimeout(() => {
            router.push('/dashboard');  // Redirect after login
        }, 1500);
    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Login failed. Try again.';
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
