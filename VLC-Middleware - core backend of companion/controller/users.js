var express = require("express");
var multer = require("multer");
var upload = multer();
var fs = require("fs");
var userController = require("./userController.js");
//var upload = multer();
//var userController = require("../controller/userController");
const neatCsv = require("neat-csv");
var router = express.Router();
/* GET users listing. */
/**
 * name of file should be uploadCsv
 */
router.post("/upload", upload.single("uploadCsv"), async function (req, res) {
  var csv = req.file.buffer.toString("utf8");
  let ar = [];
  fs.appendFile("./temp.csv", csv, function (err) {
    if (err) {
      res.send({ success: false, message: "csv file is corrupted" });
      console.log("CSV file is corrupted");
    } else {
      fs.readFile("./temp.csv", async (err, data) => {
        if (err) {
          console.error(err);
          res.send({ success: false, message: "csv file is corrupted" });
          console.log("CSV file is corrupted");
          return;
        }
        ar = await neatCsv(data);
        let response = await userController.addAllUsers(ar);
        console.log("response is", response);
        res.send({ success: response.success, data: response });
        fs.unlink("./temp.csv", function (err, data) {
          if (err) {
            console.log("unable to unlink");
          }
        });
        return;
      });
    }
  });
});

/**
 * name of file should be uploadCsv
 */
router.use(function timeLog(req, res, next) {
  //console.log("Time users: ", Date.now());
  //res.send("hello user route");
  next();
});

router.get("/users", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  try {
    let conversationHistory = [
      // manual steps from console
      { id: "1", message: "Hi, well done!! you made it", trigger: 2 },
      { id: "2", message: "I am message number 2", trigger: 3 },
      {
        id: "3",
        message:
          "What do you think about this post? I mean the combination of the image and the caption behind it? Is it fake or real?",
        trigger: 4,
      },
      { id: "4", message: "Fake", value: 5, trigger: 5 },
      {
        id: "5",
        message: "Do you think the image is Manipulated or photoshoped?",
        trigger: 6,
      },
    ];
    res.send(conversationHistory);
  } catch (error) {}
});

module.exports = router;
