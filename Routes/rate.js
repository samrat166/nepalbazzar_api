const { Router } = require("express");
const Rate = require("../Models/Rate");
const { default: mongoose } = require("mongoose");

const router = Router();

router.post("/rate", async (req, res) => {
  const response = await Rate.create(req.body);
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
});

router.get("/rate/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Rate.find({ to: id }).populate("from");
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
    res.send("Invalid ID");
  }
});

router.delete("/rate/:id", async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const response = await Rate.findByIdAndRemove({ _id: id });
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
    res.send("Invalid ID");
  }
});

module.exports = router;
