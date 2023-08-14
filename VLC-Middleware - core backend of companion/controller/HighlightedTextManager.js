const express = require('express');

const highlighted = require('../DBschema/highlighted.js');
const router = express.Router();
const postDataToLearningLocker = require('./postClickedArtifactDataToLL');

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
    vlcTime: Date.now(), // spread operator // here we
    objectID: 'highlightedAction',
    lastHighlighted: req.body.highlightedBoxList[0],
  };
  console.log(req.body.highlightedBoxList.length);
  // console.log('highlightedBoxList');
  // console.log(req.body.highlightedBoxList[0]);
  // console.log(req.body.highlightedBoxList[1]);
  // console.log('timedAllocatedReqBody');
  // console.log(timedAllocatedReqBody);

  // postDataToLearningLocker(timedAllocatedReqBody);
  try {
    highlighted
      .findOneAndUpdate(
        {
          companionUserToken: timedAllocatedReqBody.userToken,
          experienceID: timedAllocatedReqBody.experienceID,
        },
        {
          $set: {
            highlightedBoxList: timedAllocatedReqBody.highlightedBoxList,
            vlcTime: timedAllocatedReqBody.vlcTime,
          },
        },
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
  //// ============ LOGGING
  //   try {
  //     let metadataTable1 = new highlighted({
  //       vlcTime: Date.now(),
  //       companionUserToken: req.body.userToken,
  //       experienceID: req.body.experienceID,
  //       highlightedBoxList: req.body.highlightedBoxList,
  //     });
  //     console.log('metadataTable1');
  //     console.log(metadataTable1);
  //     metadataTable1.save();
  //     res.status(201).send({ message: 'success' });
  //   } catch (error) {
  //     console.log('error in saving highlighted parts');
  //     res.status(500).send({ message: 'Not success!', err });
  //     //         console.log(err);
  //   }
});

module.exports = router;
