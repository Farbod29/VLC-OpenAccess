var express = require("express");
//var upload = multer();
//var userController = require("../controller/userController");
const neatCsv = require("neat-csv");
var companionRouter = express.Router();
/* GET users listing. */

/**
 * name of file should be uploadCsv
 */
companionRouter.post("/companionconversation", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  try {
    if (!req.body) {
      return res.json({
        success: false,
        message: "body parameters are missing",
      });
    }
    let data = new companion({
      userChat: req.body.imageAndCaption,
    });
    //console.log("req.body.imageAndCaption ", req.body.imageAndCaption);
    data
      .save()
      .then(() => {
        res.json({
          success: true,
          message: "imageAndCaption is stored",
        });
      })
      .catch(() => {
        res.json({
          success: false,
          message: "imageAndCaption is not stored",
        });
      });
  } catch (error) {
    console.log("store companion data was not successful!!");
  }
});

module.exports = companionRouter;
