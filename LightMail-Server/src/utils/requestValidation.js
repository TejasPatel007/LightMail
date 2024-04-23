const httpStatus = require("http-status");
const { createResponseData } = require("../utils/response");

function validateRequest(req, res, next, schema, type = "body") {
  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  let errorData = "";
  let valueData = "";
  if (type === "body") {
    const { error, value } = schema.validate(req.body, options);
    errorData = error;
    valueData = value;
  } else {
    const { error, value } = schema.validate(req.query, options);
    errorData = error;
    valueData = value;
  }

  if (errorData) {
    return createResponseData(
      res,
      {},
      httpStatus.UNAUTHORIZED,
      true,
      errorData.details[0].message
    );
  } else {
    req.body = valueData;
    next();
  }
}

module.exports = validateRequest;
