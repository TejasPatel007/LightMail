const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { createResponseData } = require("../utils/response");
const constant = require("../utils/constants");
const { Users } = require("../models");
const { default: mongoose } = require("mongoose");

const checkToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const query = {
        _id: mongoose.Types.ObjectId(decodedToken.userId),
        "authToken.token": token,
      };
      const user = await Users.findOne(query);
      if (user.authToken.tokenExpiry < Date.now()) {
        return createResponseData(
          res,
          {},
          httpStatus.UNAUTHORIZED,
          true,
          constant.TOKEN_EXPIRED
        );
      }
      if (user) {
        req.userData = decodedToken;
        next();
      } else {
        return createResponseData(
          res,
          {},
          httpStatus.NOT_FOUND,
          true,
          constant.USER_NOT_FOUND
        );
      }
    }
  } catch (error) {
    // console.log(error);
    return createResponseData(
      res,
      {},
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      constant.TOKEN_EXPIRED
    );
  }
};

const checkTokenForUser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      const key =
        req.query.type === "admin" || req.query.type === "superAdmin"
          ? process.env.SECRET_KEY_ADMIN
          : process.env.SECRET_KEY;
      const decodedToken = jwt.verify(token, key);
      const query = {
        _id: mongoose.Types.ObjectId(decodedToken.userId),
        "authToken.token": token,
      };
      const user = await Users.findOne(query);
      if (user.authToken.tokenExpiry < Date.now()) {
        return createResponseData(
          res,
          {},
          httpStatus.UNAUTHORIZED,
          true,
          constant.TOKEN_EXPIRED
        );
      }
      if (user) {
        req.userData = decodedToken;
        next();
      } else {
        return createResponseData(
          res,
          {},
          httpStatus.NOT_FOUND,
          true,
          constant.USER_NOT_FOUND
        );
      }
    }
  } catch (error) {
    return createResponseData(
      res,
      {},
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      constant.TOKEN_EXPIRED
    );
  }
};

module.exports = {
  checkToken,
  checkTokenForUser,
};
