const router = require("express").Router();

router.get("/chat", (req, res) => {
  res.send("Chat");
});

module.exports = router;
