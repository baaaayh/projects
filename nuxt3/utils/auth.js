import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
	const useAuthState = () => useState('auth', () => ({ user: null }));

	nuxtApp.$auth = {
		get user() {
			return useAuthState().value.user;
		},

		set user(value) {
			useAuthState().value.user = value;
		},

		async login(id, pw) {
			try {
				const response = await $fetch('/api/auth', {
					method: 'POST',
					// body: { operation: 'login', data: { id, pw } },
					body: { operation: 'login', data: { id: 'bdot1', pw: '1234' } },
				});

				if (response.success) {
					this.user = id;
				}

				return response;
			} catch (error) {
				console.error(error);
				return { success: false };
			}
		},

		async logout() {
			try {
				const response = await $fetch('/api/auth', {
					method: 'POST',
					body: { operation: 'logout' },
				});

				if (response.success) {
					this.user = null;
				}

				return response;
			} catch (error) {
				console.error(error);
				return { success: false };
			}
		},

		async userInfo() {
			try {
				const user = useCookie('user_name');
				return user;
			} catch (error) {
				console.error('Failed to fetch user info:', error);
				return null;
			}
		},
	};
});
