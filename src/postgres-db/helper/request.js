import query from '../config/db.js';
import { concatStatement, quoteValues } from './helper.js';

const actionDatabase = async (obj) => {
  //Destructuring and default values
  const {
    method,
    table,
    select = null,
    columns = null,
    idName = null,
    idValue = null,
    set = null,
    returningId = null,
  } = obj;

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
      break;

    case 'insert':
      queryString = `INSERT INTO "${table}" (${columns}) VALUES(${quoteValues(
        set
      )}) RETURNING "${returningId}"`;

      break;

    case 'update':
      queryString = `UPDATE "${table}" SET (${columns}) = (${quoteValues(set)})
      WHERE ${concatStatement(
        idName,
        quoteValues(idValue)
      )} RETURNING "${returningId}"`;

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
