var SerpWow = require('google-search-results-serpwow');
// create the serpwow object, passing in our API key
let serpwow = new SerpWow('62B82547C99C4A6396F50CB617FF922B');
const express = require('express');
const app = express();
global.fetch = require('node-fetch');
const keyword_extractor_29 = require('../keyword_extractor_2');
var metadataTable = require('../DBschema/imageMetadata');
var Tesseract2 = require('tesseract.js');
const reverseImageSearch = require('reverse-image-search-google');
var IP_ADDR = 'http://localhost:8081/scraperAndAnalyser';
// var MicroserviceCommunication = require('../controller/microserviceCommunication.js');
const bodyParser = require('body-parser');
const SerpApi = require('google-search-results-nodejs');
const client = new SerpApi.GoogleSearch(
  'AIzaSyAmWg7BD1HLmQyRJR0tigVEcDHc0vh68j0'
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

class ImageMetadataControllerClass {
  async NLPAnalyzerJSON3(params) {
    return await new Promise(async function (resolve, reject) {
      //LocalStorage.clear();

      try {
        //console.log('NLP 2 is here ');
        let extract_keyword = (results) => {
          resolve(results);
        };
        await keyword_extractor_29(params, extract_keyword);
      } catch (error) {
        reject({
          success: 0,
          message: 'unable to retrieve keywords from keyword_extractor_29',
        });
      }
    });
  }

  /**
   * @return {number}
   */
  // http://localhost:8081/scraperAndAnalyser
  async nlpOutput(params) {
    let self = this;
    return await new Promise(async function (resolve, reject) {
      //LocalStorage.clear();
      try {
        let extract_keyword = (results) => {
          resolve(results);
        };
      } catch (error) {
        // await keyword_extractor_29(params, extract_keyword);
        reject({
          success: 0,
          message: 'unable to retrieve keywords from keyword_extractor_29',
        });
      }
    });
  }

  //AIzaSyAmWg7BD1HLmQyRJR0tigVEcDHc0vh68j0
  async getGoogleRIV(params) {
    const gparams = {
      engine: 'google_reverse_image',
      google_domain: 'google.com',
      image_url: 'https://i.imgur.com/HBrB8p0.png',
    };
    const callback = function (data) {
      //console.log(data);
    };
    // Show result as JSON
    client.json(gparams, callback);
  }

  async getGoogleRIVHurouku(params) {
    return await new Promise(function (resolve, reject) {
      try {
        let doSomething = (results) => {
          resolve(results);
        };
        reverseImageSearch(params, doSomething);
      } catch (error) {
        reject({
          success: 0,
          message: 'unable to retive google RIV',
        });
      }
    });
  }

  /**
   *  Async Loop that wait for each iteration for the response of services.
   *  More information about async nad batch processing can be find:  https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
   */

  async sendRIVURLsAndHandelNLPMicroservice(params) {
    return await new Promise(
      await function (resolve, reject) {
        let nlpOutput;
        //let nlpOutputArry = [];
        try {
          const sendRIVGoogleURlsToMicroservice = async () => {
            return await Promise.all(
              params.map(async (RIVurl) => {
                /////
                let param = {
                  RIVurl: RIVurl.url,
                };
                nlpOutput =
                  await MicroserviceCommunication.sendRIVGoogleURlsToMicroserviceAPI(
                    param
                  );
                //console.log("Nlp Output ", nlpOutput);
                return nlpOutput;
              })
            );
          };
          const nlpOutputArry2 = sendRIVGoogleURlsToMicroservice().then(
            (nlpOutputArry3) => {
              //console.log("important", nlpOutputArry3);
              return nlpOutputArry3;
            }
          );
          resolve(nlpOutputArry2);
        } catch (error) {
          reject({
            success: 0,
            message: 'unable to retrieve google RIV',
          });
        }
      }
    );
  }

  async getImageReverseUrlSerpwow(params) {
    return new Promise(function (resolve, reject) {
      serpwow
        .json(params)
        .then((result) => {
          // pretty-print the JSON result
          //console.log(JSON.stringify(result, 0, 5));
          let resp1 = result.pages_that_include_matching_images.splice(0, 3);
          let resp2 = result.search_information.query_displayed;
          resolve({ visually_similar_images: resp1, query: resp2 });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  async getOCRfromImage(params) {
    return new Promise(function (resolve, reject) {
      try {
        Tesseract2.recognize(params, 'eng', {
          logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
          resolve(
            text
              .replace(
                /<a\b[^>]Ω≈˜˜≤≥≥≤µæ…¬…æ«…¬˚∆˙©ƒ∂ßåœ∑†¥¨ˆˆπ“=,¥.*>¢;-ˆˆ@!%ˆŒ’”∏Ø¨Á„´&ˆ#@(.*?)|«<\/a>/i,
                ''
              )
              .replace(/(.)\1+/g, '$1')
              .replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
          );
        });
      } catch (error) {
        reject({
          success: 0,
          message: 'unable to recognise optical char recognition',
        });
      }
    });
  }

  /**
   * get userID of an user by his username
   * @param {String} username
   */

  calculateAggregationMethod(nlpOutput) {
    return new Promise(function (resolve, reject) {
      try {
        let aggregate = ' ';
        let obj;
        nlpOutput.map((nlpObj) => {
          aggregate += JSON.stringify(obj.push(nlpObj.Keywords));
          //console.log("Aggregate :", aggregate);
          return nlpOutput;
        });
        resolve(aggregate);
      } catch (error) {
        reject(false);
        console.log('aggregation has a problem!!');
      }
    });
  }

  getImageIdByImageURL(imageUrl) {
    return new Promise(function (resolve, reject) {
      try {
        //console.log('object 2======================');
        //db.collection.find().sort({$natural: -1 }).limit(5)
        metadataTable.findOne({ image_url: imageUrl }, (error, res) => {
          if (error) {
            resolve(false);
          }
          if (res === null) {
            resolve(false);
          } else {
            resolve(res);
          }
        });
      } catch (error) {
        reject(false);
        console.log('the requested image was not exist in DB');
      }
    });
  }

  async getImageMetadataFromDB(params) {
    const isImageAvailable = await this.getImageIdByImageURL(params);
    return new Promise(function (resolve, reject) {
      try {
        //console.log("is image available in DB", isImageAvailable, params);
        if (isImageAvailable === false) {
          console.log('image not found');
        } else {
          metadataTable.find({ image_url: isImageAvailable }, (err, res) => {
            if (err) {
              throw new Error('image not found');
            } else {
              let obj = {
                image_metadata: isImageAvailable,
                created_at: new Date(new Date().toUTCString()), //logdate29
              };
              resolve({
                success: 1,
                data: obj,
              });
            }
          });
        }
      } catch (error) {
        console.log('Error', error);
        resolve({
          success: 0,
          message: 'unable to get user profile',
        });
      }
    });
  }

  addVisualMetadataToDatabase = async (
    params,
    imageUrl,
    nlpOutput,
    aggregatedResult
  ) => {
    return new Promise(async function (resolve, reject) {
      try {
        if (!params) {
          console.log('RIV data is not complete !');
        } else {
          let obj = [];
          let i = -1;
          obj = params.map((image) => {
            i++;
            /////
            return {
              ReverseImageURLFromGoogleRIS: image.url,
              Position: image.position,
              Domain: image.domain,
              title: image.title,
              NLPTitle: nlpOutput[i].Title,
              Keywords: nlpOutput[i].Keywords,
              SortedKeywords: nlpOutput[i].SortedKeywords,
              FakeClaimVector: nlpOutput[i].FakeClaimVector,
              JudgmentLiteratureVector: nlpOutput[i].JudgmentLiteratureVector,
              FakeSegments: nlpOutput[i].FakeSegments,
              JudgementSegments: nlpOutput[i].JudgementSegments,
            };
          });
          // console.log(
          //   "Here is the obj for each ReverseImagesMetadata image add to DB",
          //   obj
          // );
          let metadataTable1 = new metadataTable({
            date: new Date(),
            FirstNLPTitle: nlpOutput[0].Title,
            image_url: imageUrl,
            // KeywordsAggregated: aggregatedResult?.toString() || '',
            KeywordsAggregated: aggregatedResult,
            //OCRText: ocrText,
            ReverseImagesMetadata: obj,
          });
          metadataTable1.save(function (err) {
            console.log('error is', err);
            if (err) {
              resolve({
                success: 0,
                message: 'unable to save metadata',
              });
            }
            resolve({
              success: 1,
              message: 'metadata added successfully',
              image_meta_information: metadataTable1,
            });
          });
        }
      } catch (error) {
        console.log('Error is ', error);

        reject({
          success: 0,
          message: 'unable to save metadata in addVisual Metadata to Database',
        });
      }
    });
  };
}

module.exports = new ImageMetadataControllerClass();
