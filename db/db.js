import pg from "pg";
const pool = new pg.Pool({
    user: "postgres",
    password: "legolas",
    database: "gallery-vr",
    host: "localhost",
    port: 5432
})

export default pool;