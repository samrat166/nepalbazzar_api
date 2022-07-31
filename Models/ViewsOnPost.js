const { Schema, model } = require("mongoose");
const viewsSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "PostModel",
    required: [true, "UserId Is Required"],
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = new model("ViewsModel", viewsSchema);
