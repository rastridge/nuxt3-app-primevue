export default defineEventHandler((event) => {
	const config = useRuntimeConfig()
	event.req.headers.authorization = config.apiSecret
	console.log('New request: ' + event.req.url)
})
