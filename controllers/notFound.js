// IMPORT VARIABLES
const { NOT_FOUND_CODE } = require('../utils/constants');

// NOT FOUNDED ROUTE
module.exports.notFound = (req, res) => {
  res.status(NOT_FOUND_CODE).send({
    message: 'Указан несуществующий URL',
  });
};
