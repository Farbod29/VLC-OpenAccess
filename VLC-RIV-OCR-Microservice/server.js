const express = require("express");
const API_PORT = 3001;
const app = express();
const middleware = require("./middleware.js");
const {createWorker} = require('tesseract.js');
const Tesseract = require('tesseract.js');
const {google} = require('googleapis');

/**
 * call the ./route/keywordextractor google API key
 * npm install --save @google-cloud/vision d
 */
async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}
quickstart();

/**
 *  Serpwow RIS Reverce image Search
 */

var SerpWow = require("google-search-results-serpwow");
// create the serpwow object, passing in our API key
let serpwow = new SerpWow("62B82547C99C4A6396F50CB617FF922B");
// backup key A22CC1A732874A4CB8B1A5C2362DEAF8
//62B82547C99C4A6396F50CB617FF922B
// retrieve the search results as JSON
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.listen(3001, function () {
    console.log("This app is listening on port 3001!!");
});
app.use("/", router);

function getImageReverseUrl(params) {
    return new Promise(function (resolve, reject) {
        serpwow
            .json(params)
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

router.post("/img/rev-search", async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    try {
        console.log("in this route", req.body);
        if (!req.body || !req.body.image_url || !req.body.search_type) {
            return res.json({
                success: false,
                message: "body parameters are missing",
            });
        }
        const obj = {
            image_url: req.body.image_url,
            search_type: req.body.search_type,
        };
        const resp = await getImageReverseUrl(obj);
        const resp2 = await simpleGetTextFromImage(obj);
        //google api :
        //   const resp3 = await quickstart()
        return res.json({
            success: true,
            Metadata1Serpwow: resp.search_information.query_displayed,
            SerpwowReverseImages: resp.visually_similar_images,
            OCRforTargetImage: resp2
            //OcrText:  resp2...
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "unable to get reverse image detail",
        });
    }
});


/**
 *  OCR
 */
function simpleGetTextFromImage(param) {
    console.log("OCR 2 =============================================");
    Tesseract.recognize(
        param.image_url,
        'eng',
        {logger: m => console.log(m)}
    ).then(({data: {text}}) => {
        console.log(text);
    });
}
