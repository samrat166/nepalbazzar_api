const Auth = require("../Models/Auth");

async function Authorization(req, res, next) {
  const userId = req.header("userid");
  console.log(userId);
  if (!userId) {
    return res.status(400).json({
      status: "Failure",
      msg: "User Doesnot Exists.",
    });
  }

  if (userId === process.env.ADMIN_ID) {
    next();
  } else {
    return res.status(400).json({
      status: "Failure",
      msg: "User Isnot Admin.",
    });
  }
}

module.exports = { Authorization };
