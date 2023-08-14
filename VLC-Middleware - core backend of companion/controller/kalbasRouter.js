var express = require("express");
//var upload = multer();
//var userController = require("../controller/userController");
var companionRouter = express.Router();
/* GET users listing. */
/**
 * name of file should be uploadCsv
 */
companionRouter.get("/", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  // console.log(req.body);
  try {
    res.send("gol gol gol !!!");
    // console.log(" 🚀 🌭 🌭 🥒  user is not defined!");
    // console.log("🚀 🌭 🌭 🥒  ~ file: checkUser.js ~ line 41 ~ sosis", qty);
  } catch (error) {
    console.log(error);
    res.send("Kar nakard boor gom sho ! ");
  }
});

module.exports = companionRouter;
