import pg from "pg";

const pool = new pg.Pool({
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.DB_HOST,
  PGPORT: process.env.DB_PORT,
});

const query = async (pSQL, pParams) => pool.query(pSQL, pParams);

export default query;