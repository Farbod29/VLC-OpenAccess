var express = require("express");
//var upload = multer();
//var userController = require("../controller/userController");
const neatCsv = require("neat-csv");
const user = require("../DBschema/users.js");
var companionRouter = express.Router();
/* GET users listing. */

/**
 * name of file should be uploadCsv
 */
companionRouter.post("/", async function (req, res) {
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
    let qty =
      req.body && req.body.companionUserToken
        ? req.body.companionUserToken.trim()
        : null;
    // console.log(qty);
    if (qty) {
      user
        .find({ username: qty })
        .then((user) => {
          if (user.length) {
            // console.log("User Exist in DB", user);
            res.send(true);
          } else {
            // console.log("in line 26", user);
            res.send(false);
          }
        })
        .catch((error) => {
          n;
          // console.error(error);
          res.send(error);
        });
    } else {
      res.send("user is invalid!!!");
      console.log(" 🚀 🌭 🌭 🥒  user is not defined!");
      // console.log("🚀 🌭 🌭 🥒  ~ file: checkUser.js ~ line 41 ~ sosis", qty);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = companionRouter;
