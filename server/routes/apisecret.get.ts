export default defineEventHandler((event) => {
	const config = useRuntimeConfig()

	const headers = event.req.headers

	if (headers.authorization == config.apiSecret) {
		return 'Access authorized!'
	} else {
		return 'Access denied!'
	}
})
