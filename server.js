const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const Chat = require("./Models/Chat");
const app = express();
const Port = process.env.PORT || 4000;

//Global Middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

//Initializing dotenv
require("dotenv").config({ path: "./Config/.env" });

//Initializing Database
require("./Config/dataBaseConnection");

//Home Page
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    msg: "Welcome To Nepal Bazzar",
  });
});
//Importing Routes
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/post");
const chatRoute = require("./Routes/chat");
const viewsRoute = require("./Routes/ViewsRoute");
const favouriteRoute = require("./Routes/Favourite");
const soldRoute = require("./Routes/Sold");
const rateRoute = require("./Routes/rate");

//Implementing Route
app.use("/api/v1", authRoute);
app.use("/api/v1", postRoute);
app.use("/api/v1", chatRoute);
app.use("/api/v1", viewsRoute);
app.use("/api/v1", favouriteRoute);
app.use("/api/v1", soldRoute);
app.use("/api/v1", rateRoute);

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection Established");
  socket.on("main", async ({ userId, productId, message }) => {
    const response = await Chat.create({ userId, productId, message });
  });

  socket.on("getData", async () => {
    const response = await Chat.find({}).populate("userId");

    io.emit("getData", response);
  });
});

//404 Error
app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failure",
    msg: "Page Not Found",
  });
});

server.listen(4000, () => {
  console.log("Server is up and running in 4000");
});
