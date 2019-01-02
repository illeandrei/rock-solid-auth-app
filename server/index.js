//main starting point of app
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

//DB setup
mongoose.connect(
  "mongodb://localhost:auth/auth",
  { useNewUrlParser: true }
);

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//App setup
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app); //create server that knows to receive requests and forward it to 'app'
server.listen(port);
console.log("Server is listening on port: ", port);
