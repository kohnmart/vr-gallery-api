
// Method to concatenate multiple statements
const concatStatement = (ids, val) => {
  let idsConcat = "";
  for (let i = 0; i < ids.length; i++) {
    idsConcat += ids[i] + "=" + val[i];
    i < ids.length - 1 ? (idsConcat += " AND ") : ";";
  }
  return idsConcat;
};

// Method to quote values for pg-query
const quoteValues = (input) => {
  const output = [];
  input.forEach((el) => {
    output.push("'" + el + "'");
  });
  return output;
};

export { concatStatement, quoteValues }
export default { concatStatement, quoteValues };
