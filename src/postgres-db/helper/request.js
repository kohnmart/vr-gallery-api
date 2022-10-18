import query from '../config/db.js';
import { concatStatement, quoteValues } from './helper.js';

const actionDatabase = async (obj) => {
  const method = obj.method;
  const select = obj.select;
  const columns = obj.columns;
  const table = obj.table;
  const idName = obj.idName;
  const idValue = obj.idValue;
  const set = obj.set;
  const returningId = obj.returningId;

  let queryString;

  switch (method) {
    case 'select':
      queryString = `SELECT ${select} FROM "${table}" `;

      if (idName != '') {
        const constraint = `WHERE ${concatStatement(
          idName,
          quoteValues(idValue)
        )}`;
        queryString += constraint;
      }

      queryString += ' LIMIT 2';

      /*  const constraint = `${
        idName ? "WHERE " + idName + "=" + "'" + idValue + "'" : ""
      }`;

      constraint ? (queryString += constraint) : queryString;
      */
      break;

    case 'insert':
      queryString = `INSERT INTO "${table}" (${columns}) VALUES(${quoteValues(
        set
      )}) RETURNING "${returningId}"`;

      break;

    case 'update':
      queryString = `UPDATE "${table}" SET (${columns}) = (${quoteValues(set)})
      WHERE ${concatStatement(idName, quoteValues(idValue))}`;

      break;

    case 'delete':
      queryString = `DELETE FROM "${table}" WHERE  ${concatStatement(
        idName,
        quoteValues(idValue)
      )}`;
      break;
  }
  console.log(queryString);

  //Execute concatenated query
  const result = query(queryString)
    .then((result) => {
      return { status: 200, result: result.rows };
    })
    .catch((err) => {
      console.log('ERROR DATABASE: ' + err);
      return { status: 400, result: err };
    });

  return result;
};

export default actionDatabase;
