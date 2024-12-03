const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const Helper = require("../../utils/Helper");
const messages = require("../../config/messages");
const { depositService } = require("../../services");
const ApiError = require("../../utils/ApiError");
const pick = require("../../utils/pick");
const { Deposit } = require("../../models");

/**
 * Store a Deposit
 * @type {(function(*, *, *): void)|*}
 */
const storeDeposit = catchAsync(async (req, res) => {
  const deposit = await depositService.addDeposit(req.body);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, deposit));
});
/**
 * Get a Deposit
 * @type {(function(*, *, *): void)|*}
 */
const getADeposit = catchAsync(async (req, res) => {
  const deposit = await depositService.getADeposit(req.params?.id);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, deposit));
});

/**
 * Get all Deposits
 * @type {(function(*, *, *): void)|*}
 */
const getAllDeposit = catchAsync(async (req, res) => {
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
        { iban: { $regex: term, $options: "i" } },
        ...(isNaN(termAsNumber)
          ? [] // If the term is not a number, don't include numeric fields
          : [{ amount: termAsNumber }]),
      ],
    };
  }
  const deposits = await depositService.getAllDeposits(filter, options);
  res.send(Helper.apiResponse(httpStatus.OK, messages.api.success, deposits));
});
/**
 * Delete a deposit
 * @type {(function(*, *, *): void)|*}
 */
const deleteADeposit = catchAsync(async (req, res) => {
  const deposit = await Deposit.findById(req.params.id);
  if (!deposit) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.deposit.notFound);
  }
  const deletedDeposit = await depositService.deleteDeposit(deposit);
  res.send(
    Helper.apiResponse(httpStatus.OK, messages.api.success, deletedDeposit)
  );
});
module.exports = {
  storeDeposit,
  getADeposit,
  getAllDeposit,
  deleteADeposit,
};
