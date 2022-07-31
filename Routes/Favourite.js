const { default: mongoose } = require("mongoose");
const Favourite = require("../Models/Favourite");

const router = require("express").Router();

router.post("/user/like", async (req, res) => {
  const { productId } = req.body;
  const findProduct = await Favourite.findOne({ productId });
  if (!findProduct) {
    try {
      const response = await Favourite.create(req.body);
      res.status(200).json({
        status: "success",
        msg: response,
      });
    } catch (error) {
      res.status(500).json({
        status: "failure",
        msg: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "failure",
      msg: "Item Exists",
    });
  }
});

router.delete("/user/like/:productId/:userId", async (req, res) => {
  const { productId, userId } = req.params;

  try {
    const response = await Favourite.findOneAndRemove({
      $and: [
        {
          productId: productId,
        },
        {
          userId: userId,
        },
      ],
    });
    res.status(200).json({
      status: "success",
      msg: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      msg: error.message,
    });
  }
});

router.get("/user/exists/:productId/:userId", async (req, res) => {
  const { productId, userId } = req.params;
  if (
    mongoose.Types.ObjectId.isValid(productId) &&
    mongoose.Types.ObjectId.isValid(userId)
  ) {
    const response = await Favourite.findOne({
      $and: [
        {
          productId: productId,
        },
        {
          userId: userId,
        },
      ],
    });

    try {
      res.status(200).json({
        status: "success",
        msg: response,
      });
    } catch (error) {
      res.status(500).json({
        status: "failure",
        msg: error.message,
      });
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/user/like/:userId", async (req, res) => {
  const { userId } = req.params;

  if (mongoose.Types.ObjectId.isValid(userId)) {
    const response = await Favourite.find({ userId }).populate("productId");
    try {
      res.status(200).json({
        status: "success",
        msg: response,
      });
    } catch (error) {
      res.status(500).json({
        status: "failure",
        msg: error.message,
      });
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/user/allfav", async (req, res) => {
  try {
    const response = await Favourite.find({});
    res.status(200).json({
      status: "success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      msg: error.message,
    });
  }
});

router.delete("/user/fav/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const response = await Favourite.findByIdAndRemove({ _id: id });
      res.status(200).json({
        status: "success",
        msg: response,
      });
    } catch (error) {
      res.status(500).json({
        status: "failure",
        msg: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failure",
      msg: "Invaid Object Id",
    });
  }
});

module.exports = router;
