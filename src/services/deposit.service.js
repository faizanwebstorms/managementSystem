const { depositStatus } = require("../config/payment");
const { Deposit } = require("../models");

const _filterDepositData = (data) => {
  return {
    recieverId: data?.recieverId,
    typeId: data?.typeId,
    name: data?.name,
    iban: data?.iban,
    amount: data?.amount,
    status: depositStatus.PENDING,
  };
};

/**
 * Add a Deposit
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const addDeposit = async (body) => {
  try {
    const deposit = await Deposit.create(_filterDepositData(body));

    if (!deposit) {
      throw new Error();
    }
    return deposit;
  } catch (e) {
    throw e;
  }
};
/**
 * Add a Deposit
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const getADeposit = async (id) => {
  try {
    const deposit = await Deposit.findOne({ _id: id });
    if (!deposit) {
      throw new Error();
    }
    return deposit;
  } catch (e) {
    throw e;
  }
};

/**
 * Get all Deposit
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const getAllDeposits = async (filter, options) => {
  try {
    // Build the aggregation pipeline
    const pipeline = [{ $match: filter }];
    // Apply pagination options
    const deposits = await Deposit.aggregatePaginate(
      Deposit.aggregate(pipeline),
      options
    );
    return deposits;
  } catch (e) {
    throw e;
  }
};
/**
 * Delete a Deposit
 * @returns {Promise<User>}
 */
const deleteDeposit = async (deposit) => {
  try {
    await Deposit.deleteOne({ _id: deposit?._id });
    return true;
  } catch (e) {
    throw e;
  }
};

/**
 * Update a Deposit
 * @returns {Promise<User>}
 */
const updateDeposit = async (deposit, updateBody) => {
  try {
    Object.assign(deposit, updateBody);
    await deposit.save();
    return deposit;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  addDeposit,
  getADeposit,
  getAllDeposits,
  deleteDeposit,
  updateDeposit,
};
