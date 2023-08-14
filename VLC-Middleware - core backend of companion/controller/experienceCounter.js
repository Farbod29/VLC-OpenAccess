var express = require('express');
const router = express.Router();
const experienceSchema = require('../DBschema/experienceCounter.js');
/* GET users listing. */
/**
 * name of file should be uploadCsv
 */
router.post('/setcount', async function (req, res) {
  //console.log('FOFOO 22222   ssss');
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
    experienceSchema
      .findOneAndUpdate(
        {
          userToken: req.body.userToken,
          experienceId: req.body.experienceId,
        },
        { $inc: { count: 1 } },
        // { new: true },
        { upsert: true }
      )
      .then((result) => {
        // console.log('stepCounter New ');
        // console.log(result);
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

router.post('/getcount', async function (req, res) {
  // console.log("FOFOO ssssss");
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
    // console.log('req.body.userToken + req.body.Exp');
    // console.log(req.body.userToken);
    // console.log(req.body.experienceId);
    experienceSchema
      .findOne({
        userToken: req.body.userToken,
        experienceId: req.body.experienceId,
      })
      .then((result) => {
        // console.log(result);
        if (result === null) {
          // console.log(
          //   'Haji user null shode yani peyda nashod experienceId jadide behtar!!!'
          // );
          res.send({
            experienceId: req.body.userToken,
            userToken: req.body.experienceId,
            __v: 0,
            count: 0,
          });
        } else {
          res.send(result);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Not success!', err });
        console.log(err);
      });
  } catch (error) {
    console.log('post for the companion got ERR!!', error);
  }
});
