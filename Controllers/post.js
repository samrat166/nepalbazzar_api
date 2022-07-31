const mongoose = require("mongoose");
const Post = require("../Models/Post");

const createPost = async (req, res) => {
  const response = await Post.create(req.body);
  try {
    res.status(201).json({
      status: "Success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      msg: error.message,
    });
  }
};

const getAllPost = async (req, res) => {
  const response = await Post.find({})
    .populate("userId")
    .sort({ createdAt: -1 });
  if (response.length !== 0) {
    try {
      res.status(200).json({
        status: "Success",
        msg: response,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failure",
        msg: error.message,
      });
    }
  } else {
    res.status(200).json({
      status: "Failure",
      msg: "No post at all",
    });
  }
};

const getAPost = async (req, res) => {
  const { id } = req.params;

  const response = await Post.findById({ _id: id })
    .populate("userId")
    .sort({ createdAt: -1 });
  try {
    res.status(200).json({
      status: "Success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      msg: error.message,
    });
  }
};
const getPostBySubCategory = async (req, res) => {
  const { subcategory } = req.params;
  const response = await Post.find({
    productSubCategory: subcategory,
  }).populate("userId");
  try {
    res.status(200).json({
      status: "Success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      msg: error.message,
    });
  }
};
const deletePostById = async (req, res) => {
  const { id } = req.params;

  const response = await Post.findByIdAndRemove({ _id: id })
    .populate("userId")
    .sort({ createdAt: -1 });
  try {
    res.status(200).json({
      status: "Success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      msg: error.message,
    });
  }
};

const findPostByUserId = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const valid = mongoose.isValidObjectId(id);
  if (valid) {
    const response = await Post.find({ userId: id }).sort({ createdAt: -1 });
    try {
      res.status(200).json({
        status: "Success",
        msg: response,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failure",
        msg: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failure",
      msg: "Invalid ObjectId",
    });
  }
};

const findByRegex = async (req, res) => {
  const { search } = req.params;
  const Regex = new RegExp(search, "i");
  try {
    const response = await Post.find({
      $or: [
        {
          productName: { $regex: Regex },
        },
        {
          productCategory: { $regex: Regex },
        },
        {
          location: { $regex: Regex },
        },
        {
          productSubCategory: { $regex: Regex },
        },
        {
          productBrand: { $regex: Regex },
        },
        {
          state: { $regex: Regex },
        },
      ],
    }).populate("userId");
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createPost,
  getAllPost,
  getAPost,
  findPostByUserId,
  deletePostById,
  findByRegex,
  getPostBySubCategory,
};
