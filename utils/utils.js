//function to filter fields to allow only allowed fields
exports.filteredFields = (obj, ...allowedFields) => {
  const filterdObj = {}; //define empty object

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) filterdObj[el] = obj[el];
  });

  return filterdObj;
};

exports.replaceEmptyStringsWithNull = obj => {
  const result = {};

  Object.keys(obj).forEach(key => {
    result[key] = obj[key] === '' ? null : obj[key];
  });

  return result;
};
