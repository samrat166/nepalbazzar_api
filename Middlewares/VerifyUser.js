const jwt = require("jsonwebtoken");

//Checking For User Authentication

function verify(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(403).json({
      status: "Failure",
      msg: "Not Authenticated",
    });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      msg: "Invalid Token",
    });
  }
}

module.exports = { verify };
