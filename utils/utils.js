const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  DEFAULT_CODE,
} = require('./constants');

module.exports.errorsHandler = (err, res) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST_CODE).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_CODE).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST_CODE).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  return res.status(DEFAULT_CODE).send({
    message: `На сервере произошла ошибка ${err.name}: ${err.message}`,
  });
};
