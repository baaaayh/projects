<template>
	<div>
		<Header />
		<div>
			<h1 style="padding-top: 200px">Login</h1>
			<form @submit.prevent="handleLogin">
				<input v-model="id" placeholder="ID" />
				<input v-model="pw" type="password" placeholder="PASSWORD" />
				<button type="submit">Login</button>
			</form>
			<p v-if="error">{{ error }}</p>
		</div>
	</div>
</template>

<script setup>
import Header from '@/layouts/Header.vue';
const id = ref('');
const pw = ref('');
const error = ref(null);
import { useAuthStore } from '@/store/state.js'; // import the auth store we just created

const { authenticateUser, authenticated } = useAuthStore(); // use authenticateUser action from  auth store

const user = ref({
	id: id,
});

const handleLogin = async () => {
	const response = await useNuxtApp().$auth.login(id.value, pw.value);
	if (response.success) {
		if (authenticated) {
			alert('이미 로그인되었습니다.');
		} else {
			authenticateUser(user.value.id);
		}
	} else {
		error.value = 'Invalid ID or Password';
	}
};
</script>
