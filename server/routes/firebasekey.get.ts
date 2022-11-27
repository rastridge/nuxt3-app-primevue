export default defineEventHandler((event) => {
	const config = useRuntimeConfig()

	const headers = event.req.headers

	if (headers.firebaseapikey == config.public.firebaseApiKey) {
		return 'Authorized ' + config.public.firebaseApiKey
	} else {
		return 'Access denied!'
	}
})
