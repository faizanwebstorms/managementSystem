const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const userService = require("../../services/user.service");
// const otpService = require('../../services/otp.service');
const Helper = require("../../utils/Helper");
const messages = require("../../config/messages");
const { User, Dealer } = require("../../models");

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

/**
 * Add a dealer
 * @type {(function(*, *, *): void)|*}
 */
const addDealer = catchAsync(async (req, res) => {
  const dealer = await userService.addDealer(req.body);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, dealer));
});

/**
 * Get all dealer
 * @type {(function(*, *, *): void)|*}
 */
const getAllDealers = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page']);
  if (req.query.sortBy) {
    options.sort = {};
    // eslint-disable-next-line prefer-destructuring
    options.sort[req.query.sortBy.split(':')[0]] = req.query.sortBy.split(':')[1];
  }
  let filter = {};
  if (req.query.searchTerm) {
    const term = req.query.searchTerm.trim();
    console.log('searchTerm:', term);
  
    // Try to parse the term as a number for the dealer fields
    const termAsNumber = parseFloat(term);
  
    filter = {
      $or: [
        { 'user.firstName': { $regex: term, $options: 'i' } },
        { 'user.lastName': { $regex: term, $options: 'i' } },
        { 'user.username': { $regex: term, $options: 'i' } },
        ...(isNaN(termAsNumber)
          ? [] // If the term is not a number, don't include numeric fields
          : [
              { payment_range_min: termAsNumber },
              { payment_range_max: termAsNumber },
            ]
        )
      ],
    };
  }
  
  const dealers = await userService.getAllDealers(filter , options);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, dealers));
});

/**
 * Get a dealer
 * @type {(function(*, *, *): void)|*}
 */
const getADealer = catchAsync(async (req, res) => {
  const dealer = await userService.getADealer(req.params?.id);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, dealer));
});

/**
 * Delete a dealer
 * @type {(function(*, *, *): void)|*}
 */
const deleteADealer = catchAsync(async (req, res) => {
  const dealer = await Dealer.findById(req.params.id).select('_id userId');
  if(!dealer){
    throw new ApiError(httpStatus.BAD_REQUEST, messages.dealer.notFound);
  }
  const deleteDealer = await userService.deleteADealer(dealer);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, deleteDealer));
});
module.exports = {
  updateUser,
  addDealer,
  getAllDealers,
  getADealer,
  deleteADealer
};
