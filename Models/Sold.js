const { Schema, model } = require("mongoose");

const soldSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "SellerId Is Required"],
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "BuyerId Is Required"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "PostModelData",
      required: [true, "ProductId Is Required"],
    },
    sold: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = new model("SoldModelDtm", soldSchema);
