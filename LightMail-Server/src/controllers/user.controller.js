const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const { createResponseData } = require("../utils/response");
const constant = require("../utils/constants");
const { catchAsync } = require("../utils/catchAsync");

const updateUserProfile = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName } = req.body;
  const user = await Users.findById({ _id: id });

  if (!user) {
    return createResponseData(
      res,
      {},
      httpStatus.NOT_FOUND,
      true,
      constant.USER_NOT_FOUND
    );
  }

  user.firstName = firstName;
  user.lastName = lastName;

  const updatedUser = await user.save();

  return createResponseData(
    res,
    { user: updatedUser },
    httpStatus.OK,
    false,
    constant.SUCCESS_UPDATE_USER_PROFILE
  );
});

const changePassword = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { oldPassword, password } = req.body;
  const user = await Users.findById({ _id: id });

  if (!user) {
    return createResponseData(
      res,
      {},
      httpStatus.NOT_FOUND,
      true,
      constant.USER_NOT_FOUND
    );
  }

  const passwordMatches = await bcrypt.compare(oldPassword, user.password);

  if (!passwordMatches) {
    return createResponseData(
      res,
      {},
      httpStatus.BAD_REQUEST,
      true,
      constant.INVALID_OLD_PASSWORD
    );
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  const updatedUser = await user.save();

  return createResponseData(
    res,
    {},
    httpStatus.OK,
    false,
    constant.SUCCESS_UPDATE_USER_PASSWORD
  );
});

const userLogout = catchAsync(async (req, res) => {
  const id = req.params.id;
  const logout = await Users.findByIdAndUpdate(
    { _id: id },
    { "authToken.tokenExpiry": Date.now() },
    {
      new: true,
    }
  );
  return createResponseData(
    res,
    {},
    httpStatus.OK,
    false,
    constant.LOG_OUT_SUCCESS
  );
});

module.exports = {
  updateUserProfile,
  changePassword,
  userLogout,
};
