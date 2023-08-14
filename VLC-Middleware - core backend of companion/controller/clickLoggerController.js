var express = require('express');
const router = express.Router();
//var upload = multer();
//var userController = require("../controller/userController");
const user = require('../DBschema/users.js');
const postClickedImageDataToLL = require('./postClickedArtifactDataToLL');
/* GET users listing. */

/**
 * name of file should be uploadCsv
 */
router.post('/recommendedbutton', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log("req.body");
  // console.log(req.body);
  try {
    postClickedImageDataToLL(req.body);

    // console.log('recommendedbutton click logger');
    // console.log(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post('/SociServerButton', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  console.log('req.body');
  console.log(req.body);
  try {
    postClickedImageDataToLL(req.body);

    // console.log('recommendedbutton click logger');
    // console.log(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;

router.post('/companionbutton', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body);
  try {
    // console.log(qty);
    try {
      postClickedImageDataToLL(req.body);
    } catch (e) {
      res.send(403);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post('/FinishHighlightButton', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body);
  try {
    // console.log(qty);
    try {
      postClickedImageDataToLL(req.body);
    } catch (e) {
      res.send(403);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post('/sosiButton', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body);
  try {
    // console.log(qty);
    try {
      postClickedImageDataToLL(req.body);
    } catch (e) {
      res.send(403);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post('/Analysisbutton', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body);
  try {
    // console.log(qty);
    try {
      postClickedImageDataToLL(req.body);
    } catch (e) {
      res.send(403);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post('/RIS-Link', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body);
  try {
    // console.log(qty);
    try {
      postClickedImageDataToLL(req.body);
    } catch (e) {
      res.send(403);
    }
    res.send(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;

router.post('/artifactclasification', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // console.log(req.body);
  try {
    // console.log(qty);
    try {
      postClickedImageDataToLL(req.body);
    } catch (e) {
      res.send(403);
    }
    res.send(201);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
