const jwt = require("jsonwebtoken");

const verifyReset = (req, res, next) => {
  const { token } = req.params;
  if (!token)
    return res.status(403).json({
      status: "Failure",
      msg: "No Token Found",
    });
  else {
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
};

module.exports = { verifyReset };
