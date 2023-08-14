const express = require('express');

const CompanionChat = require('../DBschema/chat.js');
const router = express.Router();
const postDataToLearningLocker = require('./postChatDataToLL.js');
//const ll = require("./learningLockerObjGenerator");
//const LLAuthentication = require("../variables/learningLocker.js");

///////Get the last chatData ////////

router.post('/getdata', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body.companionUserToken);
  // console.log(req.body.imageUrl);
  try {
    CompanionChat.find(
      {
        companionUserToken: req.body.companionUserToken,
        imageUrl: req.body.imageUrl,
      },
      {
        companionUserToken: 1,
        imageUrl: 1,
        chatHistory: { $arrayElemAt: ['$chatHistory', -1] },
      }
    )
      .then((conversationHistory) => {
        res.send(conversationHistory);
      })
      .catch((error) => res.send(error));
  } catch (error) {
    res.send(conversationHistory);
    console.log(error);
  }
});

//////////////Post Chat Data to Mdb and LL //////////////////

router.post('/', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  const timedAllocatedReqBody = {
    ...req.body,
    chatHistory: { ...req.body.chatHistory, vlcTime: Date.now() }, // spread operator // here we
  };
  postDataToLearningLocker(timedAllocatedReqBody);
  // console.log('timedAllocatedReqBody in conversation logger ');
  // console.log(timedAllocatedReqBody);
  try {
    CompanionChat.findOneAndUpdate(
      {
        experience_id: req.body.experience_id,
        companionUserToken: req.body.companionUserToken,
        imageUrl: req.body.imageUrl,
      },
      { $push: { chatHistory: timedAllocatedReqBody.chatHistory } },
      { upsert: true }
    )
      .then(() => {
        res.status(201).send({ message: 'success' });
      })
      .catch((err) => {
        res.status(500).send({ message: 'Not success!', err });
        console.log(err);
      });
  } catch (error) {
    console.log('post for the companion got ERR!!', error);
  }
});

module.exports = router;

/**
 * 
 * line 64
 * 
 *   //console.log(timedAllocatedReqBody);
  // send data to learning locker separately
  // console.log(
  //   "🚀 🌭 🌭 🥒  ~ file: conversation.js ~ line 45 ~ sosos",
  //   "should be uncomment for LL"
  // );
 * 
 * 
 *   imageUrl: req.body.imageUrl, //
      companionUserToken: req.body.companionUserToken, // reference
      chatHistory: req.body.chatHistory.map((chat) => {
        const chatObject = {
          id: chat.id,
          message: chat.message,
          value: chat.value,
          trigger: chat.trigger,
          logTime: chat.logTime,
        };
        return chatObject;
      }),
    });
 * 
 * 41 
 * 
 *     // var query = { companionUserToken: "khiyar" };
    // CompanionChat.find(query).toArray(function (err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });
    





 */
