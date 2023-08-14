let express = require('express');
let multer = require('multer');
let ImageMetadataControllerClass = require('../controller/imageMetadataController');
let router = express.Router();
let CalculateAggregationAndSortingClass = require('../controller/CalculateAggregationClass');
let postClickedImageDataToLL = require('./postClickedArtifactDataToLL');

const delay = require('lodash');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time 33: ', Date.now());
  next();
});

/**
 * Rev Image search + OCR + Keyword Extraction + Analysis + Fake labels + Connect to other Microservices
 */
router.post('/rev-search', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  try {
    // console.log(
    //   'in this route :  ====================== MMMM ==================='
    // );
    // console.log(req.body);
    appendTime = { ...req.body, logTime: Date.now() };
    postClickedImageDataToLL(appendTime);
    if (!(req.body && req.body.image_url && req.body.search_type)) {
      return res.json({
        success: false,
        message: 'body parameters are missing',
      });
    }
    // const obj = {
    //     image_url: req.body.image_url,
    //     search_type: req.body.search_type,
    // };
    const IsAlreadyExistInDB =
      await ImageMetadataControllerClass.getImageIdByImageURL(
        req.body.image_url
      );
    //console.log("already exist?? " + IsAlreadyExistInDB);
    let responseObj = { image_meta_information: IsAlreadyExistInDB };

    if (!IsAlreadyExistInDB === false) {
      // because the null and undefined are both falsy ! best way to detect is !false
      console.log('yes image metadata is already exist in DB');
      console.log('object 1======================');
      return res.json({
        success: true,
        resp: responseObj, // separate    // new one and last one
      });
    } else {
      console.log('No ! image metadata is not exist in DB');
      let respGoogle = await ImageMetadataControllerClass.getGoogleRIVHurouku(
        req.body.image_url
      );
      console.log(respGoogle);
      respGoogle.shift();
      /***
       * Microservice approach to separate the NLP from middleware module
       */
      // if (!(respGoogle[0].hasOwnProperty('url') === undefined||
      if (typeof respGoogle[0] !== 'undefined') {
        try {
          let promiseForMS = new Promise(async function (resolve) {
            const nlpOutput =
              await ImageMetadataControllerClass.sendRIVURLsAndHandelNLPMicroservice(
                respGoogle
              );
            //console.log("Nlp output array: ", nlpOutput);
            resolve(nlpOutput);
          });
          const nlpOutput = await promiseForMS.then(function (data) {
            // then doesn't have meaning FIx it
            return data;
          });
          //console.log("Nlp output array: ", nlpOutput);
          const aggregatedResult =
            await CalculateAggregationAndSortingClass.calculateAggregationMethod(
              nlpOutput
            );
          //console.log("aggregatedResult" , aggregatedResult);
          try {
            const resp3 =
              await ImageMetadataControllerClass.addVisualMetadataToDatabase(
                respGoogle,
                req.body.image_url,
                nlpOutput,
                aggregatedResult
                // ocrText
              );
            return res.json({
              success: true,
              resp: resp3,
            });
          } catch (error) {
            console.log('could not store in mongodb + Nlp output !!', error);
          }
        } catch (error) {
          console.log('could not handle sendRIVURLSandHandelNLP !!', error);
        }
      } else {
        console.log('had no url => reverse image [2,3,4,5] are empty');
        try {
          let respGoogle = [
            {
              url: 'https://www.ifla.org/publications/node/11174',
              title: 'How to detect the Fake news ?',
            },
            {
              url: 'https://www.examrace.com/Current-Affairs/NEWS-Researchers-Develop-Web-Based-Tool-to-Monitor-Fake-News-on-Social-Media-Important.htm',
              title: 'How to detect the Fake news ?',
            },
            {
              url: 'https://toolbox.google.com/factcheck/resources/static/about/example-rich-snippet.png',
              title: 'Fake goes fast !',
            },
            {
              url: 'https://www.snopes.com/content/themes/snopes/dist/images/logo-main.png',
              title: 'Snopes fact check !:',
            },
          ];
          try {
            //const lock = new Lock();
            let promiseForMS = new Promise(async function (resolve) {
              const nlpOutput =
                await ImageMetadataControllerClass.sendRIVURLsAndHandelNLPMicroservice(
                  respGoogle
                );
              //console.log("Nlp output array: ", nlpOutput);
              resolve(nlpOutput);
            });
            const nlpOutput = await promiseForMS.then(function (data) {
              return data;
            });
            const aggregatedResult =
              await CalculateAggregationAndSortingClass.calculateAggregationMethod(
                nlpOutput
              );
            console.log('Nlp output array: ', nlpOutput);
            // let nlpOutput = {
            //     image_metadata: " ",
            //     created_at: new Date(new Date().toUTCString()),
            // };
            const resp4 =
              await ImageMetadataControllerClass.addVisualMetadataToDatabase(
                respGoogle,
                req.body.image_url,
                nlpOutput,
                aggregatedResult
                // ocrText
              );
            return res.json({
              success: true,
              //Metadata1: resp.query_displayed,
              // DONT TOUCH THIS
              resp: resp4,
            });
          } catch (error) {
            console.log('for empty google NLP has error');
          }
        } catch (e) {
          console.log('could not store in mongodb!!', e);
        }
      }
    }
  } catch (error) {
    console.log('error is', error);
    return res.json({
      success: false,
      message: 'unable to get reverse image detail in metadata.js',
    });
  }
});

module.exports = router;
