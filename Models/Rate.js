const { Schema, model } = require("mongoose");

const rateSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "From Is Required"],
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "To Is Required"],
  },
  value: {
    type: Number,
    required: [true, "Value Is Required"],
  },
});

module.exports = new model("RateModel", rateSchema);
