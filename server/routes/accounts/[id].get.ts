import { accountsService } from '~~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const headers = event.req.headers

	const url = event.req.url
	const id = event.context.params.id

	if (headers.authorization == config.apiSecret) {
		return accountsService.getOne(id)
	} else {
		return []
	}
})
