const { PaymentMethodType, PaymentMethod } = require("../models");

const _filterPaymentMethodTypeData = (data) => {
  return {
    name: data?.name,
    description: data?.description,
    status: data?.status,
  };
};

const _filterPaymentMethodData = (data) => {
  return {
    dealerId: data?.dealerId,
    typeId: data?.dealerId,
    name: data?.name,
    detail: data?.detail,
    paymentMinLimit: data?.paymentMinLimit,
    paymentMaxLimit: data?.paymentMaxLimit,
    totalLimit: data?.totalLimit,
    currency: data?.currency,
    isFull: data?.isFull,
  };
};
/**
 * Add a payment method Type
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const addPaymentMethodyType = async (body) => {
  try {
    const paymentMethodType = await PaymentMethodType.create(
      _filterPaymentMethodTypeData(body)
    );
    if (!paymentMethodType) {
      throw new Error();
    }
    return paymentMethodType;
  } catch (e) {
    throw e;
  }
};
/**
 * Get a payment method type
 * @returns {Promise<User>}
 */
const getAPaymentMethodType = async (id) => {
  try {
    const paymentMethodType = await PaymentMethodType.findOne({ _id: id });
    return paymentMethodType;
  } catch (e) {
    throw e;
  }
};

/**
 * Get all payment method
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const getAllPaymentMethodyType = async (options, filter) => {
  try {
    // Build the aggregation pipeline
    const pipeline = [{ $match: filter }];
    console.log("pipeline", pipeline);
    // Apply pagination options
    const paymentMethodTypes = await PaymentMethodType.aggregatePaginate(
      PaymentMethodType.aggregate(pipeline),
      options
    );
    return paymentMethodTypes;
  } catch (e) {
    throw e;
  }
};

/**
 * Add a payment method
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const addPaymentMethod = async (body) => {
  try {
    const paymentMethod = await PaymentMethod.create(
      _filterPaymentMethodData(body)
    );
    if (!paymentMethod) {
      throw new Error();
    }
    return paymentMethod;
  } catch (e) {
    throw e;
  }
};

/**
 * Get all payment methods
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const getAllPaymentMethod = async (options, filter) => {
  try {
    // Build the aggregation pipeline
    const pipeline = [{ $match: filter }];

    // Apply pagination options
    const paymentMethod = await PaymentMethod.aggregatePaginate(
      PaymentMethod.aggregate(pipeline),
      options
    );
    return paymentMethod;
  } catch (e) {
    throw e;
  }
};

/**
 * Get a payment method
 * @returns {Promise<User>}
 */
const getAPaymentMethod = async (id) => {
  try {
    const paymentMethod = await PaymentMethod.findOne({ _id: id });
    return paymentMethod;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  addPaymentMethodyType,
  getAllPaymentMethodyType,
  addPaymentMethod,
  getAllPaymentMethod,
  getAPaymentMethodType,
  getAPaymentMethod,
};
