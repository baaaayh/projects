export default defineNuxtConfig({
	ssr: false,
	devtools: { enabled: true },
	css: ['@/public/scss/common.scss'],
	modules: ['nuxt-server-utils', 'nuxt-mongoose', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
	runtimeConfig: {
		public: {
			baseUri: '@/public/',
		},
		publicAssets: ['@/public/uploads'],
		MONGODB_URI: 'mongodb://nuxt3-mongodb-1:27017/bdot',
	},
	nitro: {
		plugins: ['@/server/db/index.ts'],
	},
	mongoose: {
		uri: 'mongodb://nuxt3-mongodb-1:27017/bdot',
		options: {},
		modelsDir: '@/mongoose',
	},
	plugins: ['@/utils/auth.js'],
	pinia: {
		storesDirs: ['@/store/**'],
	},
});
