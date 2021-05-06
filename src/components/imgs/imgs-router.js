const express = require("express");
const ImgsService = require("./imgs-service");

const imgsRouter = express.Router();

imgsRouter
  .route("/")
  .get((req, res, next) => {
    ImgsService.getImgs(req.app.get("db"))
      .then((imgs) => {
        res.json(imgs.map());
      })
      .catch(next);
  })
  .post((req, res, next) => {
    console.log(req.body);
    const { imgsrc, name } = req.body;
    const newImg = { imgsrc, name };
    ImgsService.insertImg(req.app.get("db"), newImg)
      .then((img) => {
        res.status(201).json(img);
      })
      .catch(next);
  });

module.exports = imgsRouter;
