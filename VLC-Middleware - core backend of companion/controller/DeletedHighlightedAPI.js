const express = require('express');
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
  //   console.log('req.body for delete api ((((((((((((');
  // console.log(req.body);
  const timedAllocatedReqBody = {
    ...req.body,
    vlcTime: Date.now(), // spread operator // here we
    objectID: 'highlightedDeletionAction',
  };
  //console.log('timedAllocatedReqBody for delete ');
  //console.log(timedAllocatedReqBody);
  try {
    postDataToLearningLocker(timedAllocatedReqBody);
    res.status(201).send({ message: 'success' });
  } catch (err) {
    res.status(500).send({ message: 'Not success!', err });
    console.log(err);
  }
});

module.exports = router;
