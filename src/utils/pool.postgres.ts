import { Pool } from "pg";
import "dotenv/config";

let pool: Pool | null = null;

export default function getDatabaseConnectionPool(): Pool {
    if(!pool) {
        pool = new Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            max: 10
        }) 
    }
    return pool
}