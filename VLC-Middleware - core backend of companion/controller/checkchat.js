var express = require("express");
var companionRouter = express.Router();

const CompanionChat = require("../DBschema/chat.js");

companionRouter.post("/", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  let result;
  // function prettyJSON(obj) {
  //  // console.log(JSON.stringify(obj, null, 2));
  // }
  // console.log("req.body for the chat");
  // console.log(prettyJSON(req.body));
  // console.log(req.body);
  /***
  how to write two  && (and) condition
  //docs.mongodb.com/manual/reference/operator/query/and/
    https: 
    
  /*** */
  //  $and[{},{},{}]
  try {
    CompanionChat.find({
      $and: [
        {
          companionUserToken: req.body.companionUserToken,
          imageUrl: req.body.imageUrl,
        },
        { "chatHistory.id": { $eq: req.body.stepID } },
      ],
    })
      .then((data) => {
        result = data.length ? true : false;
        // console.log("=======data");
        // console.log(prettyJSON(data));
        return result;
      })
      .then((result) => {
        // console.log("result");
        // console.log(result);
        res.send(result);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).send({ message: "check chat Not success!", err });
      });
  } catch (error) {
    // console.log(error);
    res.send("Kar nakard check chat boor gom sho 1! ");
  }
});

module.exports = companionRouter;

/***
 * 
 * 
 *   //
      // { companionUserToken: { $eq: req.body.companionUserToken } }


 *         // let result = data[0].chatHistory.filter(
          //   (chat) => chat.id === req.body.stepID
          // ).length
          //   ? true
          //   : false;
 
 * */
