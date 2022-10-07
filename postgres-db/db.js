import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "legolas",
  database: "vr-gallery",
  host: "localhost",
  port: "5432",
});

const query = async (pSQL, pParams) => pool.query(pSQL, pParams);

export default query;