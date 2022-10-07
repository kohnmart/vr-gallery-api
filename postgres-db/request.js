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

const insertTable = async (obj) => {
  const table = obj.table;
  const col = obj.col;
  const val = [];
   obj.val.forEach(element => {
     val.push("'" + element + "'");
  });

  const result = await query(`INSERT INTO ${table}(${col}) VALUES(${val})`);

  return { status: 200, result: result.rows };
};

export { requestView, insertTable };
export default { requestView, insertTable };
