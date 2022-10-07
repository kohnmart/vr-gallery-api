import query from "./db.js";

const requestView = async (obj) => {
  const select = obj.selects.join(", ");
  const view = obj.view;
  const idName = obj.idName;
  const idVal = obj.idVal;

 // console.log(`SELECT ${select} FROM "${view}" WHERE ${idName} = ${idVal};`);

  const result = await query(
    `SELECT
        ${select}
    FROM
       "${view}"
    WHERE
        ${idName} = $1;`,
    [idVal]
  );

  return { status: 200, result: result.rows };
};

export { requestView };
export default requestView;
