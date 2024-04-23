require("dotenv").config();
const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const { errorHandler } = require("./src/middleware/error");

const app = express();
const routes = require("./src/routes/index");

// enable cors
app.use(cors());
app.options("*", cors());

app.use(express.static("src/public/attachments"));

// parse json request body
app.use(express.json());

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  // console.log("CAME HERE 1::::::::");
  console.log(next(new ApiError(httpStatus.NOT_FOUND, "Not found")));
});

// handle error
app.use(errorHandler);

module.exports = app;
