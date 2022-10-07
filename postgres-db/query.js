import query from "./db.js";

const getUserInfo = async (user_id) => {
  const result = await query(
    "SELECT * FROM public.user WHERE public.user.user_id = $1",
    [user_id]
  );
  return { status: 200, result: result.rows };
};

const getUserGalleries = async (user_id) => {
  const result = await query(
    `SELECT
        g_name,
        g_date,
        g_rating,
        g_active,
        g_path
    FROM
       "getUserGalleries"
    WHERE
        u_id = $1;`,
    [user_id]
  );

  return { status: 200, result: result.rows };
};

const requestView = async (obj) => {
  const select = obj.selects.join(", ");
  const view = obj.name;
  const idName = obj.id;
  const idVal = obj.idVal;

  `SELECT
        ${select}
    FROM
       "${view}"
    WHERE
        ${idName} = $1;`,
    [idVal];

  const result = await query(
    `SELECT
       FROM 
       WHERE 
      `
  );
};

export { getUserInfo, getUserGalleries };
export default { getUserInfo, getUserGalleries };
