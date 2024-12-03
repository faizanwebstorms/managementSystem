const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { toJSON, paginate } = require("./plugins");

const depositSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Personal",
    },
    recieverId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    typeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PaymentMethodType",
    },
    name: {
      type: String,
    },
    iban: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
depositSchema.plugin(toJSON);
depositSchema.plugin(paginate);
depositSchema.plugin(aggregatePaginate);

// Set Object and Json property to true. Default is set to false
depositSchema.set("toObject", { virtuals: true, versionKey: false });
depositSchema.set("toJSON", { virtuals: true, versionKey: false });

/**
 * @typedef deposit
 */
const Deposit = mongoose.model("Deposit", depositSchema);

module.exports = Deposit;
