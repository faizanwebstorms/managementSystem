const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
// const otpService = require('../../services/otp.service');
const Helper = require("../../utils/Helper");
const messages = require("../../config/messages");
const { paymentService } = require("../../services");
const pick = require("../../utils/pick");

/**
 * Add a payment method type
 * @type {(function(*, *, *): void)|*}
 */
const addPaymentMethodType = catchAsync(async (req, res) => {
  const paymentMethodType = await paymentService.addPaymentMethodyType(
    req.body
  );
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, paymentMethodType)
  );
});
/**
 * Get a payment method type
 * @type {(function(*, *, *): void)|*}
 */
const getAPaymentMethodType = catchAsync(async (req, res) => {
  const paymentMethodType = await paymentService.getAPaymentMethodType(
    req.params?.id
  );
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, paymentMethodType)
  );
});

/**
 * Get all payment method types
 * @type {(function(*, *, *): void)|*}
 */
const getAllPaymentMethodType = catchAsync(async (req, res) => {
  console.log("req.query", req.query);
  const options = pick(req.query, ["limit", "page"]);
  console.log("options", options);
  if (req.query.sortBy) {
    options.sort = {};
    // eslint-disable-next-line prefer-destructuring
    options.sort[req.query.sortBy.split(":")[0]] =
      req.query.sortBy.split(":")[1];
  }
  let filter = {};
  if (req.query.searchTerm) {
    const term = req.query.searchTerm.trim();

    filter = {
      $or: [
        { name: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
      ],
    };
  }
  const paymentMethodType = await paymentService.getAllPaymentMethodyType(
    options,
    filter
  );
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, paymentMethodType)
  );
});

/**
 * Add a payment method
 * @type {(function(*, *, *): void)|*}
 */
const addPaymentMethod = catchAsync(async (req, res) => {
  const paymentMethod = await paymentService.addPaymentMethod(req.body);
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, paymentMethod)
  );
});

/**
 * Get all payment methods
 * @type {(function(*, *, *): void)|*}
 */
const getAllPaymentMethods = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page"]);
  if (req.query.sortBy) {
    options.sort = {};
    // eslint-disable-next-line prefer-destructuring
    options.sort[req.query.sortBy.split(":")[0]] =
      req.query.sortBy.split(":")[1];
  }
  let filter = {};
  if (req.query.searchTerm) {
    const term = req.query.searchTerm.trim();

    // Try to parse the term as a number for the dealer fields
    const termAsNumber = parseFloat(term);

    filter = {
      $or: [
        { name: { $regex: term, $options: "i" } },
        { detail: { $regex: term, $options: "i" } },
        { currency: { $regex: term, $options: "i" } },
        ...(isNaN(termAsNumber)
          ? [] // If the term is not a number, don't include numeric fields
          : [
              { paymentMinLimit: termAsNumber },
              { paymentMaxLimit: termAsNumber },
              { totalLimit: termAsNumber },
            ]),
      ],
    };
  }
  const paymentMethodType = await paymentService.getAllPaymentMethod(
    options,
    filter
  );
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, paymentMethodType)
  );
});
/**
 * Get a payment method
 * @type {(function(*, *, *): void)|*}
 */
const getAPaymentMethod = catchAsync(async (req, res) => {
  const paymentMethod = await paymentService.getAPaymentMethod(req.params?.id);
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, paymentMethod)
  );
});
module.exports = {
  addPaymentMethodType,
  getAllPaymentMethodType,
  addPaymentMethod,
  getAllPaymentMethods,
  getAPaymentMethodType,
  getAPaymentMethod,
};