const TinCan = require('tincanjs'); //Xapi
const LLAuthentication = require('../variables/learningLockerEnvCredentials.js');

const experienceIDExtractor = (Username) => {
  let fields = Username.split('@');
  let part1 = fields[1];
  let ExperimentID = part1.split('.').shift();
  return ExperimentID;
};

const learningLockerObjectGeneratorForEnvironmentArtefact = (data) => {
  console.log('data comming to statement generator!!');
  console.log(data);
  if (data.verbID === 'openedTab') {
    // openedTab
    console.log('dataLL OpenTaaab still active !!!!!! ');
    return handleOpenTab(data);
  }
  switch (data.objectID) {
    case 'RecommendedButton': {
      return handleClickedButton(data);
    }
    case 'text of the post provided by chat bot': {
      return handleHighlighted(data);
    }
    case 'FinishHighlightButton': {
      return FinishHighlightButton(data);
    }
    case 'highlightedDeletionAction': {
      return highlightedDeletionAction(data);
    }
    case 'AddHighlightedAPIForLL': {
      return handleHighlighted(data);
    }
    case 'CompanionButton': {
      return handleClickedButton(data);
    }
    case 'AnalysisButton': {
      return handleClickedButton(data);
    }
    case 'imageOnTheSocialPlatform': {
      // right-clicked
      return imageClickedMetadata(data);
    }
    case 'RIS-Links-in-RECOMMENDED-tab': {
      return RISLinkClickedMetadata(data);
    }
    case 'RIS-Specific-News': {
      return RISLinkClickedMetadata(data);
    }
    case 'highlightedAction': {
      return handleHighlighted(data);
    }
    case 'SociServerButton': {
      return SociServerButton(data);
    }
    default: {
      return null; // add dynamic log !
    }
  }
};

async function postDataToLearningLocker(data = {}) {
  try {
    //console.log("herehe 2 ======================");
    let xAPISchema = learningLockerObjectGeneratorForEnvironmentArtefact(data);
    // console.log("+++++GOOOG++++++");
    // console.log(xAPISchema);
    if (xAPISchema) {
      var statement = new TinCan.Statement(xAPISchema);
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
      console.log('could not save click statement ');
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = postDataToLearningLocker;

const imageClickedMetadata = (data) => {
  // console.log(
  //   "imageClickedMetadata =============imageOnTheSocialPlatform========"
  // );
  // console.log(data);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.userToken}`,
      name: `${data.userToken}`,
    },
    verb: {
      id: 'https://id.tincanapi.com/verb/selected',
      display: {
        'en-US': 'selected-image',
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.image_url}`,
          id:
            'https://couragecompanion.com/artifact/image' + `${data.image_url}`,
        },
      },
      id: `${data.image_url}`,
    },
    context: {
      extensions: {
        'https://CourageCompanion.eu/expapi/context-info': {
          'image-id': `${data.image_url}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          experienceID: `${experienceIDExtractor(data.userToken)}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const handleOpenTab = (data) => {
  console.log('handle Open button is now here X29882=====================');
  // console.log('OpenTab =====================');
  // console.log(data);
  console.log();

  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.userToken}`,
      name: `${data.userToken}`,
    },
    verb: {
      id: 'https://couragecompanion.eu/verbs/clicked' + `${data.verbID}`,
      display: {
        'en-US': `${data.verbID} `,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.objectID}`,
          id: 'https://couragecompanion.eu/artifact/image' + `${data.objectID}`,
        },
      },
      id:
        'https://couragecompanion.eu/artifact/image' +
        `${data.observedLinkArr}`,
    },
    context: {
      extensions: {
        'https://CourageCompanion.eu/expapi/context-info': {
          'image-id': `${data.image_url}`,
          currentActiveTab: `${data.currentActiveTab}`,
          currentActiveTabCount: `${data.currentActiveTabCount}`,
          observedLinkArr: `${data.observedLinkArr}`,
          uniqueTabCount: `${data.uniqueTabCount}`,
          environment: 'VLC',
          userToken: `${data.userToken}`,
          experienceID: `${data.experienceId}`,
          'vlc-time': `${new Date().toISOString()}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const handleClickedButton = (data) => {
  console.log('handleClickedButton =====================');
  //console.log(data);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.userToken}`,
      name: `${data.userToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/selected' + `${data.verbID}`,
      display: {
        'en-US': `${data.verbID}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.objectID}`,
          id: 'https://couragecompanion.eu/artifact/image' + `${data.objectID}`,
        },
      },
      id:
        'https://couragecompanion.eu/artifact/image' + ' ' + `${data.objectID}`,
    },
    context: {
      extensions: {
        'https://CourageCompanion.eu/expapi/context-info': {
          'image-id': `${data.image_url}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          experienceID: `${experienceIDExtractor(data.userToken)}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const RISLinkClickedMetadata = (data) => {
  // console.log("recommendedAndCompanionButton =====================");
  // console.log(data);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.userToken}`,
      name: `${data.userToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/clicked' + `${data.verbID}`,
      display: {
        'en-US': `${data.verbID}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.objectID}`,
          id: 'https://couragecompanion.eu/artifact/image' + `${data.objectID}`,
        },
      },
      id: 'https://couragecompanion.eu/artifact/image' + `${data.objectID}`,
    },
    context: {
      extensions: {
        'https://CourageCompanion.eu/expapi/context-info': {
          'image-id': `${data.image_url}`,
          RIS_url: `${data.RIS_url}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          experienceID: `${experienceIDExtractor(data.userToken)}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const handleHighlighted = (data) => {
  console.log('handleHighlighted =====================');
  console.log(data);
  if (data.lastHighlightedText) {
    let xAPIStatement = {
      actor: {
        mbox: 'mailto' + `${data.userToken}`,
        name: `${data.userToken}`, // imageSelected
      },
      verb: {
        id: 'https://w3id.org/xapi/adl/verbs/selected' + `/highlighted`,
        display: {
          'en-US': 'highlighted',
        },
      },
      object: {
        definition: {
          name: {
            'en-US': `${data.lastHighlightedText}`,
            id:
              'https://couragecompanion.eu/artifact/' +
              `${data.lastHighlightedText}`,
          },
        },
        id:
          'https://couragecompanion.eu/artifact/image' +
          ' ' +
          `${data.objectID}`,
      },
      context: {
        extensions: {
          'https://CourageCompanion.eu/expapi/context-info': {
            'image-id': `ZooPosting.jpg`,
            environment: 'VLC',
            highlightedSection: `${data.lastHighlightedText}`,
            'vlc-time': `${new Date().toISOString()}`,
            'vlc-time-Front-UTC': `${data.vlcTime}`,
            'vlc-time-Front': `${new Date(data.vlcTime)}`,
            experienceID: `${experienceIDExtractor(data.userToken)}`,
          },
        },
      },
    };
    return xAPIStatement;
  }
  //console.log(xAPIStatement);
};
const SociServerButton = (data) => {
  console.log('SociServerButton =====================');
  console.log(data);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.userToken}`,
      name: `${data.userToken}`, // imageSelected
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/selected',
      display: {
        'en-US': 'selected',
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `SociServerButton`,
          id: 'https://couragecompanion.eu/artifact/SociServerButton',
        },
      },
      id: 'https://couragecompanion.eu/artifact/' + `${data.objectID}`,
    },
    context: {
      extensions: {
        'https://CourageCompanion.eu/expapi/context-info': {
          'image-id': `${data.image_url}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          experienceID: `${experienceIDExtractor(data.userToken)}`,
        },
      },
    },
  };
  return xAPIStatement;
};
//console.log(xAPIStatement);
// Statement saved
//
const highlightedDeletionAction = (data) => {
  console.log('DELETE TO LL  =====================');
  console.log(data);
  // ...req.body,
  // vlcTime: Date.now(), // spread operator // here we
  // objectID: 'highlightedDeletionAction',
  // userToken: userToken,
  // experienceID: experienceID,
  // deletedText: Deleted,

  if (data.deletedText) {
    let xAPIStatement = {
      actor: {
        mbox: 'mailto' + `${data.userToken}`,
        name: `${data.userToken}`, // imageSelected
      },
      verb: {
        id: 'https://activitystrea.ms/schema/1.0/delete', // https://registry.tincanapi.com/#uri/verb/103
        display: {
          'en-US': 'deleted',
        },
      },
      object: {
        definition: {
          name: {
            'en-US': `${data.deletedText}`,
            id: 'https://couragecompanion.eu/artifact/' + `${data.deletedText}`,
          },
        },
        id:
          'https://couragecompanion.eu/artifact/image' +
          ' ' +
          `${data.objectID}`,
      },
      context: {
        extensions: {
          'https://CourageCompanion.eu/expapi/context-info': {
            'image-id': `ZooPosting.jpg`,
            environment: 'VLC',
            highlightedSection: `${data.deletedText}`,
            'vlc-time': `${new Date().toISOString()}`,
            experienceID: `${experienceIDExtractor(data.userToken)}`,
          },
        },
      },
    };
    return xAPIStatement;
  }
  //console.log(xAPIStatement);
};

const FinishHighlightButton = (data) => {
  console.log('FinishHighlightButton  =====================');
  console.log(data);
  // ...req.body,
  // vlcTime: Date.now(), // spread operator // here we
  // objectID: 'highlightedDeletionAction',
  // userToken: userToken,s
  // experienceID: experienceID,
  // deletedText: Deleted,
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.userToken}`,
      name: `${data.userToken}`, // imageSelected
    },
    verb: {
      id: 'https://activitystrea.ms/schema/1.0/complete',
      display: {
        'en-US': 'completed',
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `highlightedSection`,
          id: 'https://couragecompanion.eu/artifact/' + `highlightedSection`,
        },
      },
      id: 'https://couragecompanion.eu/artifact/image' + 'ZooPosting.jpg',
    },
    context: {
      extensions: {
        'https://CourageCompanion.eu/expapi/context-info': {
          'image-id': `ZooPosting.jpg`,
          environment: 'VLC',
          highlightedSection: `${data.deletedText}`,
          'vlc-time': `${new Date().toISOString()}`,
          experienceID: `${experienceIDExtractor(data.userToken)}`,
        },
      },
    },
  };
  return xAPIStatement;
  //console.log(xAPIStatement);
};
