import { accountsService } from '~~/server/services/accountsService'

export default defineEventHandler((event) => {
	const config = useRuntimeConfig()
	const headers = event.req.headers

	if (headers.authorization == config.apiSecret) {
		const a = accountsService.getAll()
		return a
	} else {
		return []
	}
})
