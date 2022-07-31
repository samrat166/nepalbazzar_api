const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (!err) {
    console.log("connected to database 😂");
  } else {
    console.log(err);
  }
});
