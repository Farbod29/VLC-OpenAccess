var express = require('express');
const router = express.Router();
//const experienceSchema = require("../DBschema/openTabsAndCountsSchema.js");
const openTabsAndCountsSchema = require('../DBschema/openTabsAndCountsSchema');
const postDataToLearningLocker = require('../../VLC-Middleware - core backend of companion/controller/postClickedArtifactDataToLL');

router.post('/', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log("req ==============");
  // console.log(req.body);
  const timedAllocatedReqBody = {
    ...req.body,
    vlcTime: Date.now(),
    verbID: 'openedTab', // spread operator
    objectID: req.body.observedLinkArr[req.body.observedLinkArr.length - 1],
  };
  // console.log('timedAllocatedReqBody.userToken');
  // console.log(timedAllocatedReqBody.userToken);
  postDataToLearningLocker(timedAllocatedReqBody);
  // console.log(' postDataToLearningLocker(timedAllocatedReqBody);');
  // console.log(timedAllocatedReqBody.observedLinkArr);
  // console.log('timedAllocatedReqBody.image_url');
  // console.log(timedAllocatedReqBody.image_url);
  try {
    openTabsAndCountsSchema
      .findOneAndUpdate(
        {
          userToken: timedAllocatedReqBody.userToken,
          experienceId: timedAllocatedReqBody.experienceId,
          uniqueTabCount: timedAllocatedReqBody.uniqueTabCount,
          observedLinkArr: timedAllocatedReqBody.observedLinkArr,
          currentActiveTab: timedAllocatedReqBody.currentActiveTab,
          currentActiveTabCount: timedAllocatedReqBody.currentActiveTabCount,
          vlcTime: timedAllocatedReqBody.vlcTime,
          image_url: timedAllocatedReqBody.image_url,
        },
        //{ $inc: { uniqueTabCount: 1 } },
        { new: true },
        // {
        //   $push: {
        //     observedLinkArr: timedAllocatedReqBody.observedLinkArr,
        //     currentActiveTab: timedAllocatedReqBody.currentActiveTab,
        //   },
        // },
        { upsert: true }
      )
      .then((result) => {
        console.log('stepCounter New ');
        console.log(result);
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
