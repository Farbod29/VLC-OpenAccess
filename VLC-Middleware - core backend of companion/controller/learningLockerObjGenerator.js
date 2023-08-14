////////////////////////Check the title of chatbot conversation////////////
// https://pfrias.couragecompanion.eu/mailto:usrT5SD5FG33@5OCT2021HRW.eu
const experienceIDExtractor = (Username) => {
  let fields = Username.split('@');
  let part1 = fields[1];
  let ExperimentID = part1.split('.').shift();
  return ExperimentID;
};

const learningLockerObjectGeneratorForChatData = (data) => {
  console.log('dataLL Chat');
  console.log(data);

  switch (data.chatHistory.id) {
    case 'Greeting': {
      return GreetingGenerator(data);
    }
    case 'Greeting CG': {
      return VLC_GreetingGenerator(data);
    }
    case 'GreetingEG': {
      console.log('greeting on top');
      return VLC_GreetingGenerator(data);
    }
    // case data.chatHistory.id: {
    //   if (
    //     data.chatHistory.id === 'Greeting CG' ||
    //     data.chatHistory.id === 'GreetingEG'
    //   ) {
    //     console.log(
    //       'GreetingEG well received ================================================================='
    //     );
    //     return VLC_GreetingGenerator(data);
    //   }
    // }
    case 'ModifiedOrNot': {
      return EndOfConversationGenerator(data);
    }
    case 'GetUserOpinion': {
      return GetUserOpinionLogGenerator(data);
    }
    case 'userInputTextIdea': {
      return userInputTextIdeaLogGenerator(data);
    }
    case 'Classification': {
      return ClassificationLogGenerator(data);
    }
    case 'Classification2': {
      return ClassificationLogGenerator(data);
    }
    case 'EducationClassification': {
      return demographicClassificationLogGenerator(data);
    }
    case 'AgeGroupeClassification': {
      return demographicClassificationLogGenerator(data);
    }
    case 'GenderClassification': {
      return demographicClassificationLogGenerator(data);
    }
    case 'GuideRecButton2': {
      return GuideRecButton2Selection(data);
    }
    case 'UserInput1 CG': {
      return UserInput1CG(data);
    }
    case 'UserInput1 EG': {
      return UserInput1CG(data);
    }
    case 'UserInput2 EG': {
      return UserInput1CG(data);
    }
    case 'UserInput2 CG': {
      return UserInput2CG(data);
    }
    case 'UserInput3 CG': {
      return UserInput3CG(data);
    }
    case 'UserInput3 EG': {
      return UserInput3CG(data);
    }
    case 'BiteZusammenfassen2 CG' || 'BiteZusammenfassen2 EG': {
      return vlcActionLogger_Asked_to_summarized(data);
    }
    case 'AskHighlight CG': {
      return AskHighlightCG(data);
    }
    case 'Fertig CG': {
      return Finished_Highlighting(data);
    }
    case 'threeOptions CG': {
      return choices(data);
    }
    case 'threeOptions EG': {
      return choices(data);
    }
    case 'HautFarbeChoices': {
      return choices(data);
    }
    case 'RacismAcknowledgementChoices': {
      return choices(data);
    }
    case 'x95ProzentKosmeticChoices': {
      console.log('x95ProzentKosmeticChoices');
      return choices(data);
    }
    case 'x92ProzentHautFarbeChoices': {
      return choices(data);
    }
    case 'NichtNormalChoices': {
      console.log('NichtNormalChoices were read');
      return choices(data);
    }
    case 'HaareFassenChoices': {
      console.log('HaareFassenChoices were read');
      return choices(data);
    }
    case 'AskHighlight EG': {
      return vlcActionLogger_AskHighlight_CG(data);
    }
    case 'AskToRightClickOtherImages1': {
      return AskToRightClickOtherImages1(data);
    }
    default: {
      console.log('could not find the proper chat id to send to LL');
      return vlcActionLogger(data);
    }
  }
};
////////////////////////// xApi Statements for VlC Chatbot environment///////////////////////
//// usrT5SD5FG33@5OCT2021HRW.eu

//Finished_Highlighting
const Finished_Highlighting = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /${data.chatHistory.value}`, // verbs
      display: {
        'en-US': `${data.chatHistory.id}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const NichtNormalChoices = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /${data.chatHistory.value}`, // verbs
      display: {
        'en-US': `${data.chatHistory.id}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          content_extension: `[Button] [Ja, ich wusste das.] [Nein, ich wusste das nicht.]`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const asked_question = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${'VLC'}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/' + `asked_questiont`, // verbs
      display: {
        'en-US': `asked_question`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};
const vlcActionLogger = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${'VLC'}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/' + `${data.chatHistory.id}`, // verbs
      display: {
        'en-US': `${data.chatHistory.id}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const vlcActionLogger_AskHighlight_CG = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${'VLC'}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/Asked_to_highlight', // verbs
      display: {
        'en-US': `Asked_to_highlight`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/ ${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const AskToRightClickOtherImages1 = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${'VLC'}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/' + `AskToRightClickOtherImages1`, // verbs
      display: {
        'en-US': `Asked_to_highlight`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const AskHighlightCG = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `VLC@courage.eu`,
      name: `VLC@courage.eu`,
    },
    verb: {
      id: `https://couragecompanion.eu/verbs/asked_to_highlight`, // verbs
      display: {
        'en-US': `asked_to_highlight`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.companionUserToken}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.companionUserToken}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/ ${data.chatHistory.id}/`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const vlcActionLogger_Asked_to_summarized = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `VLC@courage.eu`,
      name: `VLC@courage.eu`,
    },
    verb: {
      id: `https://couragecompanion.eu/verbs/asked_to_summarize`, // verbs
      display: {
        'en-US': `asked_to_summarize`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/ ${data.chatHistory.id}/`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};
const selected_option = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `VLC@courage.eu`,
    },
    verb: {
      id: `https://couragecompanion.eu/verbs/selected_option`, // verbs
      display: {
        'en-US': `selected_option`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/ ${data.chatHistory.id}/`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          mbox: 'mailto' + `${data.companionUserToken}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const UserInput1CG = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /summarized`, // verbs
      display: {
        'en-US': `summarized`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      // id:`https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          user_response: `${data.chatHistory.value}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
          previousStepMessage:
            'Kannst du bitte in einem Satz zusammenfassen, um was es in diesem Beitrag geht?',
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};
const UserInput2CG = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /summarized`, // verbs
      display: {
        'en-US': `summarized`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          user_response: `${data.chatHistory.value}`,
          content:
            'Kannst du bitte in einem Satz zusammenfassen, um was es in diesem Beitrag geht?',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          step: `${data.chatHistory.id}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const ClassificationLogGenerator = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /${data.chatHistory.value}`, // verbs
      display: {
        'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': 'classes',
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}/${data.chatHistory.value}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const demographicClassificationLogGenerator = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /${data.chatHistory.value}`, // verbs
      display: {
        'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': 'classes',
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}/${data.chatHistory.value}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};
const GuideRecButton2Selection = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /${'selected'}`, // verbs
      display: {
        'en-US': `${data.chatHistory.id}/${'selected'}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': 'RECOMMENDATION Button',
          id: `https://couragecompanion.eu/artifact/classes${
            data.chatHistory.id
          }/${'RECOMMENDATION Button'}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/ ${
        data.chatHistory.id
      }/${'RECOMMENDATION Button'}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const GreetingGenerator = (data) => {
  // console.log("NaneData to LL ========== !! ");
  // console.log(data);
  // console.log("experienceIDExtractor output ========== !! ");
  // console.log(experienceIDExtractor(data.companionUserToken));
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/' + `${data.chatHistory.id}`,
      display: {
        'en-US': `${data.chatHistory.id}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': 'VLC-Environment',
          id:
            'https://couragecompanion.eu/artifact/ChatbotSection/' +
            `${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: 'https://couragecompanion.eu/artifact/recommendationSection',
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const VLC_GreetingGenerator = (data) => {
  console.log('greeted EG !! ');
  // console.log(data);
  // console.log("experienceIDExtractor output ========== !! ");
  // console.log(experienceIDExtractor(data.companionUserToken));
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `VLC@courage.eu`,
      name: `VLC@courage.eu`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/greeted',
      display: {
        'en-US': 'greeted',
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.companionUserToken}`,
          id:
            'https://couragecompanion.eu/artifact/ChatbotSection/' +
            `${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: 'https://couragecompanion.eu/artifact/recommendationSection',
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          mbox: 'mailto' + `${data.companionUserToken}`,
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const AnswerFakeOrNotModelGenerator = (data) => {
  //console.log(xAPIStatement);
  //console.log(data.companionUserToken);
  let xAPIStatement = {};
  //console.log(xAPIStatement);
  return xAPIStatement;
};
const EndOfConversationGenerator = () => {};

module.exports = { learningLockerObjectGeneratorForChatData };

/***
 * 
 * {
    "actor": {
        "mbox": "mailto:usr838fh3@COURAGE.eu",
        "name": "usr838fh3",
        "objectType": "Agent"
    },
    "verb": {
        "id": "https://xapi.vocab.pub/describe/?url=https://w3id.org/xapi/dod-isd/verbs/answered",
        "display": { 
        "en-US": "answered"
        }
    },
    "object": {
        "definition": {
        "name": {
            "en-US": "FakeOrNotQuestion",
            "id":"https://adlnet.gov/expapi/activities/question",
            "value" : "yes",
            "expert-value" : "yes"
             }
         },
    "id": "https://curagepixelfed.eu/artifact/chat/FakeOrNotQuestion"
    },
    "context": {
         "extensions": {
                "https://curagecompanion.com/xapi/extensions/artifactinfo": {
                    "image-id": "https://curagepixelfed.com/activities/2334",
                    "chat-Id" : "FakeOrNotQuestion", 
                     "id": "https://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
                    "environment":"VLC",
                    "vlc-time" : "162312432545",
                    "experienceID" : "5OCTOBER2021HRW"  
          }
      }
    }
}
 * 
 */

/***
 * 
 *       mbox: `${data.companionUserToken}`,
      name: `${data.companionUserToken.split("@")[0]}`,
      objectType: "Agent",
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/answered",
      display: {
        "en-US": "answered",
      },
    },
    object: {
      definition: {
        name: {
          "en-US": "FakeOrNotQuestion",
          id: "https://adlnet.gov/expapi/activities/question",
          value: `${data.value}`,
          expertValue: "yes", // `${data.expertValue}`
        },
      },
      id: "https://curagepixelfed.eu/artifact/chat/FakeOrNotQuestion",
    },
    context: {
      extensions: {
        "https://curagecompanion.com/xapi/extensions/artifactinfo": {
          imageId: `${data.imageId}`,
          chatId: "FakeOrNotQuestion",
          id: "https://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
          environment: "VLC",
          vlcTime: `${new Date().toISOString()}`, // utcDate1.toUTCString() // Date.now brings string
          experienceID: `${data.companionUserToken.split("@")[1]}`, // 5OCTOBER2021HRW // usrT5SD5FG33@5OCT2021HRW
        },
      },
    },
 * 
 * 
 */

//
//   {
//   imageUrl: 'https://pfrias.couragecompanion.eu/storage/m/_v2/213587224007151616/222ce2dde-c74ca4/3bqKgw3mqAga/ecTJ3vNGyHhgAamvuEhkhWVUG1M0BEefwBUSdUj3.jpeg',
//   companionUserToken: 'usrT5SD5FG33@5OCT2021HRW',
//   chatHistory: [
//     {
//       id: 'Greeting',
//       message: 'Hi, well done!! you made it',
//       value: null,
//       trigger: 'ShowThumbnail'
//     },
//     {
//       id: 'ShowThumbnail',
//       message: 'I am message number ShowThumbnail',
//       value: null,
//       trigger: 'GetUserOpinion'
//     },
//     {
//       id: 'GetUserOpinion',
//       message: 'What do you think about this post? I mean the combination of the image and the caption behind it? Is it fake or real?',
//       value: null,
//       trigger: 'FakeOrRealOptions'
//     }
//      {
//            id: 'FakeOrRealOptions',
//              message: 'I am message number FakeOrRealOptions',
//            value: 'Fake',
//        trigger: 'ModifiedOrNot'
//         }
//   ],
//   logTime: 1622450692680
// }
//chatID

//return newLearningLockerObjectGenerator;
/***
 * 
 * "actor": {
        "mbox": "mailto:usr838fh3@COURAGE.eu",
        "name": "usr838fh3"
    },
    "verb": {
        "id": "https://w3id.org/xapi/adl/verbs/logged-in",
        "display": { 
        "en-US": "logged-in"
        }
    },
       "object": {
        "definition": {
            "name": {
                    "en-US": "VLC-Envrionment",
                    "id":"couragecompanion.eu/artifact/ChatbotSection"
                }
         },
    "id": "couragecompanion.eu/artifact/recommendationSection"
    },
    "context": {
         "extensions": {
                "https://couragecompanion.eu/expapi/context-info": {
                    "image-id": "https://couragecompanion.eu.com/artifact/image/2334", 
                    "environment":"VLC",
                    "vlc-time" : "1624556432999",
                    "experienceID" : "5OCTOBER2021HRW"      
          }
      }
    }
 * 
 * 
 * actor: {
      mbox: `mailto:${data.companionUserToken}`,
      name: "usr838fh3",
      objectType: "Agent",
    },
    verb: {
      id: "https://xapi.vocab.pub/describe/?url=https://w3id.org/xapi/dod-isd/verbs/answered",
      display: {
        "en-US": "answered",
      },
    },
    object: {
      definition: {
        name: {
          "en-US": "FakeOrNotQuestion",
          id: "https://adlnet.gov/expapi/activities/question",
          value: `${data.value}`,
          expertValue: "yes",
        },
      },
      id: "https://curagepixelfed.eu/artifact/chat/FakeOrNotQuestion",
    },
    context: {
      extensions: {
        "https://curagecompanion.com/xapi/extensions/artifactinfo": {
          "image-id": "https://curagepixelfed.com/activities/2334",
          "chat-Id": "FakeOrNotQuestion",
          id: "https://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
          environment: "VLC",
          "vlc-time": new Date().toISOString(),
          experienceID: "5OCTOBER2021HRW",
        },
      },
    },
  };



  actor: {
      mbox: "mailto:usr838fh3@COURAGE.eu",
      name: "COMPANION",
      objectType: "Agent",
    },
    verb: {
      id: "https://xapi.vocab.pub/describe/?url=https://w3id.org/xapi/dod-isd/verbs/Greeting",
      display: {
        "en-US": "Greeting",
      },
    },
    object: {
      definition: {
        name: {
          "en-US": "Greeting",
          id: "https://adlnet.gov/expapi/activities/question",
          targetUser: `${data.companionUserToken}`,
        },
      },
      id: "https://curagepixelfed.eu/artifact/chat/FakeOrNotQuestion",
    },
    context: {
      extensions: {
        "https://curagecompanion.com/xapi/extensions/artifactinfo": {
          "image-id": "https://curagepixelfed.com/activities/2334",
          "chat-Id": "Greeting",
          id: "https://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
          environment: "VLC",
          "vlc-time": new Date().toISOString(),
          experienceID: "5OCTOBER2021HRW",
        },
      },
    },
 */

const userInputTextIdeaLogGenerator = (data) => {
  // console.log("userInputTextIdea data!!");
  // console.log(data);
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id}/summarized`,
      display: {
        'en-US': `summarized`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': 'VLC-Environment',
          id:
            'https://couragecompanion.eu/artifact/ChatbotSection/' +
            `${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
          value: 'yes',
        },
      },
      id: 'https://couragecompanion.eu/artifact/recommendationSection',
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const GetUserOpinionLogGenerator = (data) => {
  // console.log("NaneData to LL ========== !! ");
  // console.log(data);
  // console.log("experienceIDExtractor output ========== !! ");
  // console.log(experienceIDExtractor(data.companionUserToken));
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/' + `${data.chatHistory.id}`,
      display: {
        'en-US': `${data.chatHistory.id}`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': 'VLC-Environment',
          id:
            'https://couragecompanion.eu/artifact/ChatbotSection/' +
            `${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: 'https://couragecompanion.eu/artifact/recommendationSection',
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};
const choices = (data) => {
  // console.log("NaneData to LL ========== !! ");
  // console.log(data);
  // console.log("experienceIDExtractor output ========== !! ");
  // console.log(experienceIDExtractor(data.companionUserToken));
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id: 'https://w3id.org/xapi/adl/verbs/chosen',
      display: {
        'en-US': `chosen`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.value}`,
          id:
            'https://couragecompanion.eu/artifact/ChatbotSection/' +
            `${data.chatHistory.value}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: 'https://couragecompanion.eu/artifact/recommendationSection',
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          content: `${data.chatHistory.message}`,
          step: `${data.chatHistory.id}`,
          environment: 'VLC',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,

          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};

const UserInput3CG = (data) => {
  let experienceID = experienceIDExtractor(data.companionUserToken);
  let xAPIStatement = {
    actor: {
      mbox: 'mailto' + `${data.companionUserToken}`,
      name: `${data.companionUserToken}`,
    },
    verb: {
      id:
        'https://w3id.org/xapi/adl/verbs/' +
        `${data.chatHistory.id} 
        /summarized`, // verbs
      display: {
        'en-US': `summarized`,
      },
    },
    object: {
      definition: {
        name: {
          'en-US': `${data.chatHistory.id}/${data.chatHistory.value}`,
          id: `https://couragecompanion.eu/artifact/classes${data.chatHistory.id}`,
          nextStep: `${data.chatHistory.trigger}`,
        },
      },
      id: `https://couragecompanion.eu/artifact/${data.chatHistory.id}`,
    },
    context: {
      extensions: {
        'https://couragecompanion.eu/expapi/context-info': {
          'image-id': `${data.imageUrl}`,
          environment: 'VLC',
          user_response: `${data.chatHistory.value}`,
          content:
            'Gut gemacht! Danke, dass du mit mir gechattet hast. Meine letzte Frage lautet: Wie bewertest du mich insgesamt? Was gefiel dir gut, was weniger?',
          'vlc-time': `${new Date().toISOString()}`,
          'vlc-Front-time': `${data.chatHistory.vlcTime}`,
          step: `${data.chatHistory.id}`,
          'vlc-log-time': `${data.vlcTime}`,
          experienceID: `${experienceID}`,
        },
      },
    },
  };
  //console.log(xAPIStatement);
  return xAPIStatement;
};
