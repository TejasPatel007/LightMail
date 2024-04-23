const httpStatus = require("http-status");

const errorHandler = (err, req, res, next) => {
  let { message } = err;
  statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  res.locals.errorMessage = err.message;

  const response = {
    errorMessage: message,
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
