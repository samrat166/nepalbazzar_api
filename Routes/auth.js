const router = require("express").Router();
const {
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
} = require("../Controllers/auth");
const { verifyReset } = require("../Middlewares/VerifyResetToken");
const { verify } = require("../Middlewares/VerifyUser");
const Auth = require("../Models/Auth");
const { Authorization } = require("../Middlewares/Authorization");

router.get("/user/all", Authorization, async (req, res) => {
  const response = await Auth.find({});
  try {
    res.status(200).json({
      status: "success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      msg: error.message,
    });
  }
});

router.post("/user/register", createUser);
router.post("/user/login", userLogin);
router.post("/user/forgot/password", forgotPassword);
router.get("/user/details/:id", verify, findUserById);
router.get("/users/details/", getAllUsers);
router.get("/users/details/", getAllUsers);
router.get("/reset/password/:token", verifyReset, resetPassword);
router.delete("/user/delete/:id", Authorization, deleteUserById);
router.put("/user/update/:id", updateUser);
router.put("/user/reset/password/:email", resetPasswordValue);
router.put("/user/updateaddress/:id", updateAddress);
router.put("/user/updatename/:id", updateName);
router.put("/user/updateimage/:id", updateImage);

module.exports = router;
