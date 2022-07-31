const { model, Schema } = require("mongoose");

const chatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "UserId Is Required"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "PostModelData",
    required: [true, "ProductId Is Required"],
    unique: true,
  },
});

module.exports = new model("FavouriteProduct", chatSchema);
