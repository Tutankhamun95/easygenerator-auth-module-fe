<script setup lang="ts">
import { ref } from 'vue';
import { signUp } from '@/services/api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleSignUp = async () => {
    try {
        await signUp({ email: email.value, password: password.value });
        successMessage.value = 'Signup successful! Please log in.';
        setTimeout(() => router.push('/login'), 1500);
    } catch (error) {
        errorMessage.value = 'Signup failed';
    }
};
</script>

<template>
    <div>
        <h1>Signup</h1>
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="handleSignUp">Sign Up</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>
