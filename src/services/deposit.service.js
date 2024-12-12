const { depositStatus, transactionTypeStatus } = require("../config/payment");
const { Deposit } = require("../models");

const _filterDepositData = (data) => {
  return {
    serviceProviderId: data?.recieverId,
    typeId: data?.typeId,
    name: data?.name,
    iban: data?.iban,
    amount: data?.amount,
    senderId: data?.senderId,
    status: depositStatus.PENDING,
    transactionType: data?.transactionType
      ? data?.transactionType
      : transactionTypeStatus.DEPOSIT,
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
 * Get all Deposits
 * @param {Object} filter - MongoDB filter object
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} - Paginated deposits with associated data
 */
const getAllDeposits = async (filter, options) => {
  try {
    // Build the aggregation pipeline
    const pipeline = [
      // Match deposits based on the filter
      { $match: filter },

      // Lookup for Personal based on senderId
      {
        $lookup: {
          from: "personals", // Collection name for Personal
          localField: "senderId",
          foreignField: "_id",
          as: "personal",
        },
      },
      // Unwind the personal array to a single object
      {
        $unwind: {
          path: "$personal",
          preserveNullAndEmptyArrays: true, // Keep deposits even if no matching personal is found
        },
      },

      // Lookup for Dealer based on serviceProviderId
      {
        $lookup: {
          from: "dealers", // Collection name for Dealer
          localField: "serviceProviderId",
          foreignField: "_id",
          as: "dealer",
        },
      },
      // Unwind the dealer array to a single object
      {
        $unwind: {
          path: "$dealer",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup for PaymentMethodType based on typeId
      {
        $lookup: {
          from: "paymentmethodtypes", // Collection name for PaymentMethodType
          localField: "typeId",
          foreignField: "_id",
          as: "paymentMethodType",
        },
      },
      // Unwind the paymentMethodType array to a single object
      {
        $unwind: {
          path: "$paymentMethodType",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    // Apply pagination options using aggregatePaginate
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
