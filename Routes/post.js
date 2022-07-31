const router = require("express").Router();
const {
  createPost,
  getAllPost,
  getAPost,
  findPostByUserId,
  deletePostById,
  findByRegex,
  getPostBySubCategory,
} = require("../Controllers/post");
const { Authorization } = require("../Middlewares/Authorization");
const { verify } = require("../Middlewares/VerifyUser");
const Post = require("../Models/Post");

router.post("/post", verify, createPost);
router.get("/posts/all", getAllPost);
router.get("/posts/subcategory/:subcategory", getPostBySubCategory);
router.get("/post/one/:id", getAPost);
router.get("/post/oneuser/:id", findPostByUserId);
router.get("/find/regex/:search", findByRegex);
router.get("/find/location/name/:name/:location", async (req, res) => {
  const { name, location } = req.params;
  const LocationRegex = new RegExp(location, "i");
  const NameRegex = new RegExp(name, "i");
  try {
    const response = await Post.find({
      $and: [{ location: LocationRegex }, { productName: NameRegex }],
    }).populate("userId");
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

router.delete("/post/delete/:id", Authorization, deletePostById);

module.exports = router;
