import query from "./db.js";
import { concatStatement, quoteValues } from "./helper.js";

const actionDatabase = async (obj) => {
  const method = obj.method;
  const select = obj.select;
  const columns = obj.columns;
  const table = obj.table;
  const idName = obj.idName;
  const idValue = obj.idValue;
  const set = obj.set;

  let queryString;

  switch (method) {
    case "select":
      queryString = `SELECT ${select} FROM "${table}" `;

      const constraint = `${
        idName ? "WHERE " + idName + "=" + "'" + idValue + "'" : ""
      }`;

      constraint ? (queryString += constraint) : queryString;

      break;

    case "insert":
      queryString = `INSERT INTO ${table}(${columns}) VALUES(${quoteValues(
        set
      )})`;

      break;

    case "update":
      queryString = `UPDATE "${table}" SET ${columns} = ${set} WHERE ${concatStatement(
        idName,
        quoteValues(idValue)
      )}`;

      break;

    case "delete":
      queryString = `DELETE FROM "${table}" WHERE  ${concatStatement(
        idName,
        quoteValues(idValue)
      )}`;
        console.log(queryString);
      break;
  }
  const result = await query(queryString);

  return { status: 200, result: result.rows };
};

export default actionDatabase;
