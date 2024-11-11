const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { toJSON, paginate } = require("./plugins");
const userConfig = require("../config/user");

const dealerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    payment_range_min: {
      type: Number,
    },
    payment_range_max: {
      type: Number,
    },
    classification: {
      type: Number,
      enum: userConfig.getDealerClassifications,
      default: userConfig.dealerClassifications.NETSELLER,
    },
  },

  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dealerSchema.plugin(toJSON);
dealerSchema.plugin(paginate);
dealerSchema.plugin(aggregatePaginate);

// Set Object and Json property to true. Default is set to false
dealerSchema.set("toObject", { virtuals: true, versionKey: false });
dealerSchema.set("toJSON", { virtuals: true, versionKey: false });

/**
 * @typedef Dealer
 */
const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;
