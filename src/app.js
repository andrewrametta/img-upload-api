require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const imgsRouter = require("./components/imgs/imgs-router");
const { cloudinary } = require("../utils/cloudinary");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(express.json());
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello happy World");
});

app.use("/api/imgs", imgsRouter);

app.post("/api/upload", async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: "payitforward",
    });
    console.log(uploadResponse);
    console.log(uploadResponse.url);
    res.send(uploadResponse);
    console.log(fileString);
  } catch (error) {
    console.error(error);
  }
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "product") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
