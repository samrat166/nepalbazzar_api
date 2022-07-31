const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "UserId Is Required"],
    },
    productName: {
      type: String,
      required: [true, "Product Name Is Required"],
      trim: true,
    },
    productCategory: {
      type: String,
      required: [true, "Product Category Is Required"],
      trim: true,
    },
    productSubCategory: {
      type: String,
      required: [true, "Product Sub-Category Is Required"],
      trim: true,
    },
    productBrand: {
      type: String,

      trim: true,
    },
    productDescription: {
      type: String,
      required: [true, "Product Description Is Required"],
      trim: true,
    },
    pic1: {
      type: String,
      required: [true, "Pic1 Is Required"],
      trim: true,
    },
    pic2: {
      type: String,
      trim: true,
    },
    pic3: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location Is Required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State Of Product Is Required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price Is Required"],
      trim: true,
    },
    negotiable: {
      type: Boolean,
      required: [true, "Is It Negotiable Or Not"],
    },
  },
  { timestamps: true }
);

postSchema.pre("save", async function (req, res, next) {
  if (
    this.pic2 ===
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16s0oBAZeWoNoU8gAp7AQMbX964nW1Ea4D56fiET_PMC1lACqY8RcRNqgYfq3xcKQWaM&usqp=CAU"
  ) {
    this.pic2 === undefined;
    next();
  } else if (
    this.pic3 ===
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16s0oBAZeWoNoU8gAp7AQMbX964nW1Ea4D56fiET_PMC1lACqY8RcRNqgYfq3xcKQWaM&usqp=CAU"
  ) {
    this.pic3 === undefined;
    next();
  }
});

module.exports = new model("PostModelData", postSchema);
