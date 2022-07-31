const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name of user is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email of user is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password of user is required"],
    },
    hashedPassword: {
      type: String,
      unique: true,
    },
    pic: {
      type: String,
      required: [true, "Picture of user is required"],
      trim: true,
    },
    number: {
      type: String,
      required: [true, "Phone Number of user is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location of user is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Basic"],
      default: "Basic",
    },
  },
  { timestamps: true }
);

//Hashing Password Before Save
userSchema.pre("save", async function (req, res, next) {
  const salt = await bcrypt.genSalt(10);
  this.hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = undefined;
  next();
});

module.exports = new model("Users", userSchema);
