const Auth = require("../Models/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const { sendMail } = require("../Helpers/Mail");

const createUser = async (req, res) => {
  const findEmail = await Auth.findOne({ email: req.body.email });
  if (!findEmail) {
    try {
      const newUser = await Auth.create(req.body);
      res.status(201).json({
        success: true,
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  } else {
    res.status(400).json({
      status: "Failure",
      msg: `User With ${req.body.email} Already Exists.Please Use Another Email.`,
    });
  }
};

const userLogin = async (req, res) => {
  const presentUser = await Auth.findOne({ email: req.body.email });

  if (!presentUser)
    return res.status(400).json({
      status: "Failure",
      msg: `Email "${req.body.email}" Is Not Found`,
    });
  const validPassword = await bcrypt.compare(
    req.body.password,
    presentUser.hashedPassword
  );
  if (!validPassword)
    return res.status(400).json({
      status: "Failure",
      msg: "Password Is Incorrect",
    });

  try {
    await new Auth({
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ _id: presentUser._id }, process.env.TOKEN_SECRET);
    res.status(200).json({
      _id: presentUser._id,
      token: token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const isValid = mongoose.isValidObjectId(id);

  if (isValid) {
    try {
      const response = await Auth.findById({ _id: id });
      res.status(200).json({
        success: "success",
        user: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  } else {
    res.status(400).send("Not A Valid ID");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { pass, pass1 } = req.body;

  const presentUser = await Auth.findById({ _id: id });
  const validPassword = await bcrypt.compare(pass, presentUser.hashedPassword);
  if (validPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(pass1, salt);

    const response = await Auth.findByIdAndUpdate(
      { _id: id },
      { hashedPassword: hashedValue },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: "success",
      user: response,
    });
  } else {
    res.status(400).json({
      status: "failure",
      msg: "Old Password Is Incorrect",
    });
  }
};

async function getAllUsers(res, res) {
  try {
    const response = await Auth.find({});
    res.status(200).json({
      success: "success",
      user: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
}

const updateImage = async (req, res) => {
  const { id } = req.params;
  const response = await Auth.findByIdAndUpdate(
    { _id: id },
    { pic: req.body.pic },
    { new: true, runValidators: true }
  );
  try {
    res.status(200).json({
      success: "success",
      user: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
};

const updateName = async (req, res) => {
  const { id } = req.params;
  const response = await Auth.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  try {
    res.status(200).json({
      success: "success",
      user: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
};
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const response = await Auth.findByIdAndRemove({ _id: id });
  try {
    res.status(200).json({
      success: "success",
      user: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const response = await Auth.findByIdAndUpdate(
    { _id: id },
    { location: req.body.location },
    { new: true, runValidators: true }
  );
  try {
    res.status(200).json({
      success: "success",
      user: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const emailExists = await Auth.findOne({ email: email });
  if (emailExists) {
    const token = jwt.sign({ _id: emailExists._id }, process.env.TOKEN_SECRET);
    const message = `http://localhost:3000/reset/password/${token}/${email}`;

    sendMail(email, message);
    try {
      res.json({ msg: "Email Sent Successfully" });
    } catch (error) {
      res.json(error.message);
    }
  } else {
    res.status(400).json({
      status: "failure",
      msg: `Email ${email} Doesnot Exists.`,
    });
  }
};

const resetPassword = async (req, res) => {
  res.json("Hello");
};

const resetPasswordValue = async (req, res) => {
  const { pass1 } = req.body;
  const { email } = req.params;

  const salt = await bcrypt.genSalt(10);
  const hashedValue = await bcrypt.hash(pass1, salt);

  const response = await Auth.findOneAndUpdate(
    { email: email },
    { hashedPassword: hashedValue },
    { new: true, runValidators: true }
  );
  try {
    res.status(200).json({
      success: "success",
      user: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  findUserById,
  updateUser,
  updateImage,
  getAllUsers,
  updateName,
  forgotPassword,
  resetPassword,
  resetPasswordValue,
  updateAddress,
  deleteUserById,
};
