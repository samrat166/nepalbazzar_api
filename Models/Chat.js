const { Schame, model, Schema } = require("mongoose");

const chatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "UserId Is Required"],
  },
  productId: {
    type: String,
    required: [true, "ProductId Is Required"],
  },
  message: {
    type: String,
    required: [true, "Message Is Required"],
    trim: true,
  },
});

module.exports = new model("ChatModelAdmin", chatSchema);
