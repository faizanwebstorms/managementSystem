const httpStatus = require("http-status");
const { User, Dealer } = require("../models");
const ApiError = require("../utils/ApiError");
const { roles } = require("../config/user");
const mongoose = require("mongoose");
/**
 * filter User Data from request
 * @param data
 * @returns {*}
 * @private
 */
const _filterUserData = (data) => {
  return {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    password: data?.password,
    username: data?.username,
    role: data?.role,
  };
};

/**
 * filter Dealer Data from request
 * @param data
 * @returns {*}
 * @private
 */
const _filterDealerData = (data, userId) => {
  return {
    userId,
    payment_range_min: data?.paymentRangeMin,
    payment_range_max: data?.paymentRangeMax,
    classification: data?.classification,
  };
};

/**
 * Filter Social Links data from request
 * @param data
 * @param roleId
 * @returns {{phoneNumber, roleId, name, email}}
 * @private
 */
const _filterSocialUserData = (data) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    type: data.type,
    facebookId: data.facebookId,
    googleId: data.googleId,
    appleId: data.appleId,
  };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<{user: *}>}
 */
const findById = async (_id) => {
  try {
    const user = await User.findById(_id).lean();
    if (!user) throw new Error();
    return user;
  } catch (e) {
    return false;
  }
};

/**
 * Validate Email and Username
 * @param userBody
 * @returns {Promise<void>}
 */
const validateEmailandUsername = async (userBody) => {
  const emailExists = await checkEmailValidity(userBody.email);
  // const userNameExists = await checkUsernameValidity(userBody.username);

  // Check if email/username already exists
  if (!emailExists) {
    let message = !emailExists ? "Email" : "";
    // message += !userNameExists ? " Username" : "";

    throw new ApiError(httpStatus.BAD_REQUEST, `${message} already Exists`);
  }
};

/**
 * find User by filters
 * @param filters
 * @param multiple
 * @returns {Promise<*>}
 */
const findByClause = async (filters, multiple = false) => {
  if (multiple) {
    return User.find(filters);
  }
  return User.findOne(filters);
};

/**
 * Create a user
 * @param {Object} userBody
 */
const createUser = async (userBody) => {
  try {
    await validateEmailandUsername(userBody);
    const item = await User.create(_filterUserData(userBody));
    if (!item) {
      throw new Error();
    }
    delete item._doc.password;

    return { ...item.toObject() };
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

/**
 * Create a user against a new social login
 * @param userBody
 * @returns {*}
 */
const createSocialUser = async (userBody) => {
  try {
    // Create User
    const item = await User.create(_filterSocialUserData(userBody));
    if (!item) {
      throw new Error();
    }

    return { ...item.toObject() };
  } catch (error) {
    throw error;
  }
};

/**
 * Check if email exists
 * @param email
 * @returns {Promise<boolean>}
 */
const checkEmailValidity = async (email) => {
  try {
    const user = await findByClause({ email });
    return !user;
  } catch (error) {
    return false;
  }
};

/**
 * check if username exists
 * @param username
 * @returns {Promise<boolean>}
 */
const checkUsernameValidity = async (username) => {
  try {
    const user = await findByClause({ username });
    return !user;
  } catch (error) {
    return false;
  }
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const update = async (user, updateBody) => {
  try {
    Object.assign(user, updateBody);
    await user.save();

    return user;
  } catch (e) {
    throw error;
  }
};

/**
 * Add a delaer
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */
const addDealer = async (body) => {
  try {
    body.role = roles.DEALER;
    const user = await createUser(body);

    if (!user) {
      throw new Error("Unable to create user");
    }

    const dealer = await Dealer.create(_filterDealerData(body, user?._id));

    return { user, dealer };
  } catch (e) {
    throw e;
  }
};

/**
 * Get all dealers with user information using aggregate and aggregatePaginate
 * @returns {Promise<Object>}
 */
const getAllDealers = async (filter, options) => {
  try {
    // Build the aggregation pipeline
    const pipeline = [
      { $lookup: {
          from: 'users',        
          localField: 'userId',  
          foreignField: '_id',  
          as: 'user',            
        }
      },
      { $unwind: '$user' },      // Unwind to flatten the user data if only one user per dealer
      { $match: filter }         
    ];

    // Apply pagination options
    const dealers = await Dealer.aggregatePaginate(Dealer.aggregate(pipeline), options);

    return dealers;
  } catch (e) {
    throw e;
  }
};



/**
 * Get a dealer
 * @returns {Promise<User>}
 */
const getADealer = async (id) => {
  try {
    const dealer = await Dealer.findOne({ _id: id }).populate(
      "userId",
      "_id name email firstName isEmailVerified"
    );
    return dealer;
  } catch (e) {
    throw e;
  }
};

/**
 * Get a dealer
 * @returns {Promise<User>}
 */
const deleteADealer = async (dealer) => {
  try {
    await User.deleteOne({_id: dealer?.userId});
    await Dealer.deleteOne({_id: dealer?._id});
    return true;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  findByClause,
  findById,
  createUser,
  createSocialUser,
  checkUsernameValidity,
  checkEmailValidity,
  validateEmailandUsername,
  update,
  addDealer,
  getAllDealers,
  getADealer,
  deleteADealer
};
