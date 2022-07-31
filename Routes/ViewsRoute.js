const ViewsOnPost = require("../Models/ViewsOnPost");

const router = require("express").Router();

router.post("/views/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ViewsOnPost.create({ productId: id });
    res.status(200).json({
      status: "success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "failures",
      msg: error.message,
    });
  }
});

router.get("/views/post/:id", async (req, res) => {
  const { id } = req.params;
  const response1 = await ViewsOnPost.findOne({ productId: id });
  try {
    const response = await ViewsOnPost.findOneAndUpdate(
      { productId: id },
      { count: response1.count + 1 },
      { new: true, runValidators: true }
    );
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

router.get("/views/postcount/:id", async (req, res) => {
  const { id } = req.params;
  const response = await ViewsOnPost.findOne({ productId: id });
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
});

module.exports = router;
