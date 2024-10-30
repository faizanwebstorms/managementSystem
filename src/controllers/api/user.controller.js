const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const userService = require("../../services/user.service");
// const otpService = require('../../services/otp.service');
const Helper = require("../../utils/Helper");
const messages = require("../../config/messages");
const { User } = require("../../models");

/**
 * Update user personal Information
 * @type {(function(*, *, *): void)|*}
 */
const updateUser = catchAsync(async (req, res) => {
  let user = await User.findById(req.params?.userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.api.userNotFound);
  }
  const updatedUser = await userService.update(user, req.body);
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, updatedUser)
  );
});

module.exports = {
  updateUser,
};
