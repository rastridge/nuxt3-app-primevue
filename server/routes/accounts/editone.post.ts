import { accountsService } from '~~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const headers = event.req.headers
	const body = await useBody(event)
	if (headers.authorization == config.apiSecret) {
		return accountsService.editOne(body)
	}
})
