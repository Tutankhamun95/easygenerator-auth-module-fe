<script setup lang="ts">
import { ref } from 'vue';
import { signUp } from '@/services/api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();
const name = ref('');

const handleSignUp = async () => {
    errorMessage.value = ''; // Clear previous errors
    successMessage.value = '';

    try {
        const response = await signUp({ 
            name: name.value,
            email: email.value, 
            password: password.value 
        });

        console.log('Signup Response:', response);  // Debugging response
        successMessage.value = 'Signup successful! Redirecting to login...';

        // Delay before redirecting for a smooth UX
        setTimeout(() => {
            router.push('/login');
        }, 1500);

    } catch (error: any) {
        console.error('Signup Error:', error.response?.data || error.message);
        errorMessage.value = error.response?.data?.message || 'Signup failed. Try again.';
    }
};

</script>

<template>
    <div>
        <h1>Signup</h1>
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="name" placeholder="Name" />
        <button @click="handleSignUp">Sign Up</button>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<style>
.success {
    color: green;
    font-weight: bold;
}
.error {
    color: red;
    font-weight: bold;
}
</style>

