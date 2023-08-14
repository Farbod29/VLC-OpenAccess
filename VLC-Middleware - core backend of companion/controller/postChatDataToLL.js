const ll = require('./learningLockerObjGenerator');
const LLAuthentication = require('../variables/learningLockerEnvCredentials.js');
const TinCan = require('tincanjs'); //Xapi

async function postDataToLearningLocker(data = {}) {
  // console.log("data");
  // console.log(data);
  // console.log("companionUserToken1");
  // console.log(data.companionUserToken);
  let xAPISchema = ll.learningLockerObjectGeneratorForChatData(data); // this is for conversation steps
  // console.log("+++++GOOOG++++++");
  // console.log(xAPISchema);
  if (xAPISchema) {
    var statement = new TinCan.Statement(xAPISchema);
    // console.log("JSON.stringify(statement)===========");
    // console.log(JSON.stringify(statement));
    var lrs;
    try {
      lrs = new TinCan.LRS(LLAuthentication);
      lrs.saveStatement(statement, {
        callback: function (err, xhr) {
          if (err !== null) {
            if (xhr !== null) {
              console.log(
                'Failed to save statement: ' +
                  xhr.responseText +
                  ' (' +
                  xhr.status +
                  ')'
              );
              // TODO: do something with error, didn't save statement
              return;
            }
            console.log('Failed to save statement: ' + err);
            // TODO: do something with error, didn't save statement
            return;
          }
          console.log('Statement saved');
          // TOOO: do something with success (possibly ignore)
        },
      });
    } catch (e) {
      console.log('Failed to setup LRS object: ', e);
    }
  } else {
    console.log('there is no schema for such conversation ! ');
  }
}

module.exports = postDataToLearningLocker;

/***  const AnswerFakeOrNotModelGenerator = (data) => {
//   //console.log("sosissssssssssssss =====================");
//   //console.log(xAPIStatement);
//   console.log(data.companionUserToken);
//   let xAPIStatement = {
//     actor: {
//       mbox: `mailto:${data.companionUserToken}`,
//       name: "usr838fh3",
//       objectType: "Agent",
//     },
//     verb: {
//       id: "http://xapi.vocab.pub/describe/?url=https://w3id.org/xapi/dod-isd/verbs/answered",
//       display: {
//         "en-US": "answered",
//       },
//     },
//     object: {
//       definition: {
//         name: {
//           "en-US": "FakeOrNotQuestion",
//           id: "http://adlnet.gov/expapi/activities/question",
//           value: `${data.value}`,
//           expertValue: "yes",
//         },
//       },
//       id: "http://curagepixelfed.eu/artifact/chat/FakeOrNotQuestion",
//     },
//     context: {
//       extensions: {
//         "http://curagecompanion.com/xapi/extensions/artifactinfo": {
//           "image-id": "http://curagepixelfed.com/activities/2334",
//           "chat-Id": "FakeOrNotQuestion",
//           id: "http://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
//           environment: "VLC",
//           "vlc-time": new Date().toISOString(),
//           experienceID: "5OCTOBER2021HRW",
//         },
//       },
//     },
//   };
//   //console.log(xAPIStatement);
//   return xAPIStatement;
// };
*/
