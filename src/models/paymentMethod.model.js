const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { toJSON, paginate } = require("./plugins");

const paymentMethodSchema = mongoose.Schema(
  {
    dealerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Dealer",
    },
    typeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PaymentMethodType",
    },
    name: {
      type: String,
    },
    detail: {
      type: String,
    },
    paymentMinLimit: {
      type: Number,
    },
    paymentMaxLimit: {
      type: Number,
    },
    totalLimit: {
      type: Number,
    },
    currency: {
      type: String,
    },
    isFull: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentMethodSchema.plugin(toJSON);
paymentMethodSchema.plugin(paginate);
paymentMethodSchema.plugin(aggregatePaginate);

// Set Object and Json property to true. Default is set to false
paymentMethodSchema.set("toObject", { virtuals: true, versionKey: false });
paymentMethodSchema.set("toJSON", { virtuals: true, versionKey: false });

/**
 * @typedef PaymentMethod
 */
const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = PaymentMethod;