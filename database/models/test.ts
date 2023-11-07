import { PoolClient } from 'pg'
import { Database } from '../utils/db'
import withClientConnection from '../utils/withClientConnection'

export const Test = {
    async createTable() {
        return withClientConnection(async (client: PoolClient) => {
            await client.query(`
                CREATE TABLE IF NOT EXISTS test (
                    test VARCHAR(24)
                );
            `)
        }, Database.getInstance())
    },
}
