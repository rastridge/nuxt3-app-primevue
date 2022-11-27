// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		// The private keys which are only
		// available within server-side
		apiSecret: process.env.API_SECRET,
		DB_HOST: process.env.DB_HOST,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_DATABASE: process.env.DB_DATABASE,
		ONSERVER: process.server,
		ONCLIENT: process.client,
		// Keys within public, will be also be
		// exposed to the client-side
		public: {
			firebaseApiKey: process.env.FIREBASE_API_KEY,
		},
	},
	css: [
		'primevue/resources/themes/saga-blue/theme.css',
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'primeflex/primeflex.css',
	],
	build: {
		transpile: ['primevue'],
	},
})
