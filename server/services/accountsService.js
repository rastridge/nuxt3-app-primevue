import mysql from 'mysql2/promise'

const TABLE_NAME = 'inbrc_accounts'
const config = useRuntimeConfig()

async function doDBQuery(sql, inserts) {
	const conn1 = await mysql.createConnection({
		host: config.DB_HOST,
		user: config.DB_USER,
		password: config.DB_PASSWORD,
		database: config.DB_DATABASE,
	})
	if (inserts) {
		sql = mysql.format(sql, inserts)
	}
	const [rows, fields] = await conn1.execute(sql, inserts)
	await conn1.end()
	return rows
}

export const accountsService = {
	getAll,
	getOne,
	addOne,
	editOne,
	deleteOne,
}

async function getAll() {
	const sql = `SELECT *
							FROM ${TABLE_NAME}
							WHERE deleted = 0
							ORDER BY member_lastname ASC`

	const accounts = await doDBQuery(sql)
	// console.log('accounts = ', accounts)
	return accounts
}

async function getOne(id) {
	const sql = `SELECT *
							FROM ${TABLE_NAME}
							WHERE account_id = ?`
	const accounts = await doDBQuery(sql, [id])
	const account = accounts[0]
	return account
}

async function addOne(info) {
	const sql = `INSERT INTO ${TABLE_NAME}
							SET
									account_email = ?,
									member_firstname = ?,
									member_lastname = ?,
									comment = ?,
									created_dt = NOW(),
									modified_dt = NOW();`
	const { account_email, member_firstname, member_lastname, comment } = info
	const accounts = await doDBQuery(sql, [
		account_email,
		member_firstname,
		member_lastname,
	])
	console.log('addOne -- ', account_email, member_firstname, member_lastname)
	return accounts
}

async function editOne(info) {
	// console.log('editOne --  info = ', info)

	const sql = `UPDATE ${TABLE_NAME}
							SET
									account_email = ?,
									member_firstname = ?,
									member_lastname = ?,
									comment = ?,
									modified_dt= NOW()
								WHERE account_id = ?;`
	const {
		account_email,
		member_firstname,
		member_lastname,
		comment,
		account_id,
	} = info
	const accounts = await doDBQuery(sql, [
		account_email,
		member_firstname,
		member_lastname,
		comment,
		account_id,
	])
	console.log(
		'on server editOne -- ',
		account_email,
		member_firstname,
		member_lastname,
		comment,
		account_id
	)
	return accounts
}

async function deleteOne(id) {
	console.log('deleteOne --  id = ', id)

	const sql = `UPDATE ${TABLE_NAME}
							SET
									deleted = '1',
									deleted_dt= NOW()
								WHERE account_id = ?;`

	const accounts = await doDBQuery(sql, [id])
	console.log('deleteOne -- ', id)
	return accounts
}
// return accounts
