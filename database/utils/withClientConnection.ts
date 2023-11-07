import { PoolClient } from 'pg'
import { Database } from './db'
import BaseError from '../../error/BaseError'
import { StatusCodes } from 'http-status-codes'

async function withClientConnection<T>(
    callback: (client: PoolClient) => Promise<T>,
    database: Database
): Promise<T> {
    const client = await database.getPool().connect()
    try {
        const result = await callback(client)
        return result
    } catch (error) {
        if (error instanceof Error) {
            throw new BaseError(
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
        return Promise.resolve<T>({} as T)
    } finally {
        client.release()
    }
}

export default withClientConnection
