// Copyright 2017 Google LLC
//
const { google } = require('googleapis');
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//export GOOGLE_APPLICATION_CREDENTIALS ="./GOOGLEKEY.json";
('use strict');

// [START vision_quickstart]
async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./gorbe.jpg');
  const labels = result.labelAnnotations;
  //console.log('Labels:');
  labels.forEach((label) => console.log(label.description));
}
// [END vision_quickstart]

quickstart().catch(console.error);
