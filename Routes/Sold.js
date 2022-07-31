const { default: mongoose } = require("mongoose");
const Sold = require("../Models/Sold");

const router = require("express").Router();

router.post("/sold/item", async (req, res) => {
  const response1 = await Sold.findOne({
    $and: [
      { sellerId: req.body.sellerId },
      { buyerId: req.body.buyerId },
      { productId: req.body.productId },
    ],
  });

  if (!response1) {
    const response = await Sold.create(req.body);

    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res
      .status(400)
      .json({ msg: "You Have Already Requested To Buy This Item." });
  }
});

router.get("/sold/item/buyer/:productId/:buyerId", async (req, res) => {
  if (
    mongoose.Types.ObjectId.isValid(req.params.buyerId) &&
    mongoose.Types.ObjectId.isValid(req.params.productId)
  ) {
    const response1 = await Sold.findOne({
      $and: [
        { buyerId: req.params.buyerId },
        { productId: req.params.productId },
      ],
    });

    if (response1) {
      try {
        res.status(400).json({
          status: "success",
          msg: data,
        });
      } catch (error) {
        res.json(error.message);
      }
    } else {
      res
        .status(400)
        .json({ msg: "You Have Already Requested To Buy This Item." });
    }
  } else {
    res.status(400).json({ msg: "Invalid id" });
  }
});

router.get("/sold/item/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Sold.find({ productId: id }).populate(
      "sellerId buyerId productId"
    );
    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/sold/ornot/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Sold.findOne({
      $and: [{ productId: id }, { sold: true }],
    });
    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/sold/user/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Sold.find({ sellerId: id })
      .populate("sellerId buyerId productId")
      .sort({ createdAt: -1 });
    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/buy/user/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Sold.find({ buyerId: id })
      .populate("sellerId buyerId productId")
      .sort({ createdAt: -1 });
    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/sold/buyer/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Sold.find({ buyerId: id })
      .populate("sellerId buyerId productId")
      .sort({ createdAt: -1 });
    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.send("Invalid Id");
  }
});

router.get("/sold/item/buyer/:productId/:buyerId", async (req, res) => {
  const { productId, buyerId } = req.params;
  console.log(productId, buyerId);
  if (
    mongoose.Types.ObjectId.isValid(productId) &&
    mongoose.Types.ObjectId.isValid(buyerId)
  ) {
    const response = await Sold.findOne({
      $and: [{ buyerId: buyerId }, { productId: productId }],
    });
    try {
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.send("Invalid Id");
    console.log("Invalid Id");
  }
});

router.put("/sold/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Sold.findByIdAndUpdate(
      { _id: id },
      { sold: true },
      { new: true, runValidators: true }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
