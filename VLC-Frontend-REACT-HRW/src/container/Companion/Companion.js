import React from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import './CSS/button.css';
/***
 ChatBot is export default
 Loading is simple export  
 ***/
//import HighlighterHandler from "./HighlighterHandler";
import serverSideAddresses from '../../utils/ServerSideAddress.js';
import companionContext from '../../context.js';
import Emoji from './ImagesAndICONS/logo.png';
import userAvatar from './ImagesAndICONS/Admin.jpg';
import tutorial from './ImagesAndICONS/tutorial.png';
import Highlighter from './EmbededHighlighter/Highlighter';
import Steps from './CompanionLanguages/Steps/DuSteps.js';
import { stepExtractor } from './stepExtractor';
import getExperienceCountAPICaller from './getExperienceCountAPICaller';
import experienceIdExtractor from './experienceIdExtractor';
// import experimentGroupeExtractor from './experienceIdAndGroupExtractor';
//import Steps from "./Steps/ItSteps.js";
//import Steps from "./Steps/SpSteps.js";

const clickLoggerForSociServerButton = (imageUrl) => {
  fetch(`${serverSideAddresses}/clicklogger/SociServerButton`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_url: imageUrl,
      userToken: localStorage.getItem('companionUserToken'),
      objectID: `SociServerButton`,
      verbID: `selected`,
    }),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Companion = () => {
  getExperienceCountAPICaller();
  const consumer = React.useContext(companionContext);
  var experienceCount = Number(localStorage.getItem('experienceCount'));
  const [oldConversation, setOldConversation] = React.useState(null);
  const [chatbotMountStatus, setChatbotMountStatus] = React.useState(false);
  const [finishHighlightState, setFinishHighlightState] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  // const [experienceCount, setExperienceCount] = React.useState(() => {
  //   return experienceCount;
  // });

  const sendExperienceCount = async () => {
    const userToken = localStorage.getItem('companionUserToken');
    const experienceId = experienceIdExtractor(userToken);
    // console.log('experienceIdExtractor natijash ', experienceId);
    await sendExperienceCountAPI(userToken, experienceId);
    // console.log('sendExperienceCountAPI activated count ++');
    getExperienceCountAPICaller();
  };
  const sendExperienceCountAPI = async (userToken, experienceId) => {
    // console.log("step counter");
    // console.log(userToken + experienceId);
    try {
      await fetch(`${serverSideAddresses}/experienceCounter/setcount`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToken: userToken,
          experienceId: experienceId,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const saveChatHistory = (chatHistory) => {
    const chatInfo = {
      imageUrl: `${consumer.receivedImageInfo.image_meta_information.image_url}`,
      experience_id: experienceIdExtractor(
        localStorage.getItem('companionUserToken')
      ),
      companionUserToken: localStorage.getItem('companionUserToken'),
      chatHistory: chatHistory,
    };
    fetch(`${serverSideAddresses}/checkchat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: chatInfo.imageUrl,
        companionUserToken: chatInfo.companionUserToken,
        stepID: chatHistory.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let shouldInsert = data ? false : true;
        if (shouldInsert) {
          fetch(`${serverSideAddresses}/conversation`, {
            method: 'POST',
            body: JSON.stringify(chatInfo),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((msg) => {
              // console.log('successfully chat sent to backend' + msg);
            })
            .catch((err) => {
              'Could not add chat info to backend + '(err);
            });
        }
      })
      .catch((err) => console.log(err));
  };
  const saveImageVoteApi = (params) => {
    // this is for xAPI
    return new Promise((resolve, reject) => {
      let userId = localStorage.getItem('companionUserToken');
      let experienceId = experienceIdExtractor(userId);
      fetch(`${serverSideAddresses}/image/reaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          user_id: userId,
        },
        body: JSON.stringify({
          image_url: params.image_url,
          experience_id: experienceId,
          vote: params.vote,
          stepID: params.stepID,
          demographicsVote: params.demographicsVote,
        }),
      })
        .then((response) => response.json)
        .then((res) => {
          if (res.success === true) resolve(res);
          else reject(new Error('unable to save'));
        })
        .catch((err) => reject(err));
    });
  };
  const saveImageVote = async (params) => {
    try {
      const resp = await saveImageVoteApi(params);
      // console.log('response of saving vote is', resp);
    } catch (error) {
      console.log('unable to save vote');
    }
  };
  const triggerInfo = (info, nextStep, vote, stepID, demographicsVote) => {
    const currentChat = stepExtractor(info.steps, nextStep);
    saveChatHistory(currentChat);
    saveImageVote({
      image_url: consumer.receivedImageInfo.image_meta_information.image_url,
      vote: vote,
      stepID: stepID,
      demographicsVote: demographicsVote,
    });
    return nextStep;
  };
  const getOldConversation = async () => {
    try {
      await fetch(`${serverSideAddresses}/conversation/getdata`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: `${consumer.receivedImageInfo.image_meta_information.image_url}`,
          companionUserToken: localStorage.getItem('companionUserToken'),
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          reformatOldConversationFunction(res);
        });
    } catch (err) {
      console.log('get conversation API has problem');
    }
  };
  const experimentGroupeExtractor = (Username) => {
    let fields = Username.split('.');
    let part1 = fields[1];
    let ExperimentGroup = part1.split('.').shift();
    return ExperimentGroup;
  };
  const reformatOldConversationFunction = (res) => {
    getExperienceCountAPICaller();
    let userId = localStorage.getItem('companionUserToken');
    if (res.length > 0) {
      let reformatOldConversation = {
        id: res[0].chatHistory[0].id,
        message: res[0].chatHistory[0].message,
        trigger: res[0].chatHistory[0].trigger,
      };
      setOldConversation(reformatOldConversation);
    } else {
      console.log('else res.length < 0 ');
      let group = experimentGroupeExtractor(userId);
      if (group === 'CG') {
        setOldConversation({
          id: 'Greeting CG',
          message: `Hi, gut gemacht. Du hast es geschafft!`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'ShowThumbnail CG'));
            return 'ShowThumbnail CG';
          },
        });
      } else if (group === 'EG') {
        setOldConversation({
          id: 'GreetingEG',
          message: `Hi, gut gemacht. Du hast es geschafft!`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'ShowThumbnail EG'));
            return 'ShowThumbnail EG';
          },
        });
      }
    }
    setChatbotMountStatus(true);
  };
  let image_url_Trigger =
    consumer.receivedImageInfo.image_meta_information.image_url;

  React.useEffect(() => {
    // component did mount / will unmount
    setChatbotMountStatus(false);
    getOldConversation();
  }, [image_url_Trigger]);

  /**
   *     ================== Start STEPS CG ==================
   */
  const conversationSteps = [
    oldConversation,
    // ===================== CG =====================

    // ===================== ShowThumbnail CG
    {
      delay: 3000,
      id: 'ShowThumbnail CG',
      component: (
        <img
          src={consumer.receivedImageInfo.image_meta_information.image_url}
          style={{
            width: '50%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        getExperienceCountAPICaller();
        console.log(experienceCount);
        if (experienceCount === 0) {
          // local storage gives string
          saveChatHistory(stepExtractor(info.steps, 'AskToCheckComments CG'));
          return 'AskToCheckComments CG';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'BiteZusammenfassen2 CG'));
          return 'BiteZusammenfassen2 CG';
          // return 'BiteZusammenfassen2 CG';
          // } else if (experienceCount >= 2) {
          //   //saveChatHistory(stepExtractor(info.steps, 'alreadyCheckedCG'));
          //   console.log('bozorgtar as 2 ');
          //   return 'alreadyChecked CG';
        }
      },
    },
    // ======================================================  Picture 1 CG
    // =====================  AskToCheckCommentsCG
    {
      delay: 3000,
      id: 'AskToCheckComments CG',
      message: Steps.AskToCheckComments,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'okButton CG'));
        return 'okButton CG';
      },
    },
    // =====================  okButton
    {
      id: 'okButton CG',
      options: [
        {
          value: 'ok',
          label: `ok`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'BiteZusammenfassen CG'));
            return 'BiteZusammenfassen CG';
          },
        },
      ],
    },
    // ===================== BiteZusammenfassen1 CG
    {
      id: 'BiteZusammenfassen CG',
      message: Steps.BiteZusammenfassen,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'UserInput1 CG'));
        return 'UserInput1 CG';
      },
    },
    // ===================== UserInput1 CG ======= Here differentiate picture one or two !
    {
      id: 'UserInput1 CG',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Bitte gib eine etwas längere Antwort ein (mehr als 30 Zeichen).';
        }
        return true;
      },
      trigger: (info) => {
        sendExperienceCount();
        saveChatHistory(
          stepExtractor(info.steps, 'AskToRightClickOtherImages1 CG')
        );
        return 'AskToRightClickOtherImages1 CG';
      },
    },
    // ===================== AskToRightClickOtherImages1 CG =================
    {
      delay: 1000,
      id: 'AskToRightClickOtherImages1 CG',
      message:
        'Bitte sieh dir jetzt den zweiten Beitrag an. Klick dazu mit der rechten Maustaste auf das Bild und dann auf die Schaltfläche “COURAGE-Companion“.',
      trigger: (info) => {
        getExperienceCountAPICaller();
        saveChatHistory(stepExtractor(info.steps, 'end'));
        return 'end';
      },
    },
    // =============================================    Picture 2 CG
    // ===================== BiteZusammenfassen2 CG'
    {
      id: 'BiteZusammenfassen2 CG',
      message: Steps.BiteZusammenfassen,
      trigger: (info) => {
        //console.log('BiteZusammenfassen');
        saveChatHistory(stepExtractor(info.steps, 'UserInput2 CG'));
        return 'UserInput2 CG';
      },
    },
    // ===================== UserInput2 CG
    {
      id: 'UserInput2 CG',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Bitte gib eine etwas längere Antwort ein (mehr als 30 Zeichen).';
        }
        return true;
      },
      trigger: (info) => {
        // console.log('UserInput2 CG 111111');
        sendExperienceCount();
        saveChatHistory(stepExtractor(info.steps, 'AskHighlight CG'));
        return 'AskHighlight CG';
      },
    },
    // ===================== AskHighlightCG
    {
      delay: 3000,
      id: 'AskHighlight CG',
      message: Steps.AskHighlight,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'Highlighter CG'));
        return 'Highlighter CG';
      },
    },
    // =====================Highlighter CG
    {
      delay: 15000,
      id: 'Highlighter CG',
      component: (
        <HighlighterHandler finishHighlightState={finishHighlightState} />
      ),
      waitAction: true,
      asMessage: true,
    },
    // ===================== returnAfterHighlight CG
    {
      delay: 1000,
      id: 'returnAfterHighlight CG',
      message: ' ',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'Continue CG'));
        return 'Continue CG';
      },
    },
    // ===================== Confirm CG
    {
      id: 'Continue CG',
      options: [
        {
          label: `Weiter geht's!`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, '3Möglichkeiten CG'));
            setFinishHighlightState(true);
            // console.log('finishHighlightState');
            // console.log(finishHighlightState);
            return '3Möglichkeiten CG';
          },
        },
      ],
    },
    // ===================== Du hast nun 3 Möglichkeiten. Für was entscheidest du dich?
    {
      delay: 4000,
      id: '3Möglichkeiten CG',
      message: 'Du hast nun 3 Möglichkeiten. Für was entscheidest du dich?',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'threeOptions CG'));
        return 'threeOptions CG';
      },
    },
    // ===================== threeOptions
    {
      id: 'threeOptions CG',
      options: [
        {
          value: 'Ich like den Beitrag',
          label: `Ich like den Beitrag`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'GutGemacht CG'));
            return 'GutGemacht CG';
          },
          // triggerInfo(
          //   info,
          //   'BiteZusammenfassen CG',
          //   '',
          //   'GenderClassification',
          //   'Male'
          // );
        },
        {
          value: 'Ich melde den Beitrag',
          label: `Ich melde den Beitrag`,
          trigger: (info) => {
            console.log(finishHighlightState);
            saveChatHistory(stepExtractor(info.steps, 'GutGemacht CG'));
            return 'GutGemacht CG';
          },
        },
        {
          value: 'Ich mache nichts',
          label: `Ich mache nichts`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'GutGemacht CG'));
            return 'GutGemacht CG';
          },
        },
      ],
    },
    // ============== Gut Gemacht CG
    {
      delay: 4000,
      id: 'GutGemacht CG',
      message:
        'Gut gemacht! Danke, dass du mit mir gechattet hast. Meine letzte Frage lautet: Wie bewertest du mich insgesamt? Was gefiel dir gut, was weniger?',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'UserInput3 CG'));
        return 'UserInput3 CG';
      },
    },
    // ===================== UserInput3 CG
    {
      id: 'UserInput3 CG',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Bitte gib eine etwas längere Antwort ein (mehr als 30 Zeichen).';
        }
        return true;
      },
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'Fertig CGEG'));
        sendExperienceCount();
        return 'Fertig CGEG';
      },
    },
    // =====================Fertig
    {
      delay: 1000,
      id: 'Fertig CGEG',
      message:
        'Fertig! Bitte klicke auf den folgenden Link, um zum Fragebogen zurückzukehren. Bis bald!',
      trigger: 'SociLink Component CG',
    },
    // =====================SociLink Component CG
    {
      delay: 3000,
      id: 'SociLink Component CG',
      component: (
        <button
          className={'btn'}
          onClick={() => {
            clickLoggerForSociServerButton(
              consumer.receivedImageInfo.image_meta_information.image_url
            );
            window.open(
              'https://www.soscisurvey.de/informationtransfer2/',
              '_blank'
            );
          }}
        >
          zur Online-Umfrage
        </button>
      ),
      trigger: 'End',
    },
    // ===================== End
    {
      id: 'End',
      message: 'Ciao ! ',
      end: true,
    },
    //**************************************************************** */

    // ===================== ExperimentGroup EG =========================
    // ===================== ShowThumbnail EG
    {
      delay: 3000,
      id: 'ShowThumbnail EG',
      component: (
        <img
          src={consumer.receivedImageInfo.image_meta_information.image_url}
          style={{
            width: '50%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        getExperienceCountAPICaller();
        console.log(experienceCount);
        if (experienceCount === 0) {
          // local storage gives string
          saveChatHistory(stepExtractor(info.steps, 'AskToCheckComments EG'));
          return 'AskToCheckComments EG';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'BiteZusammenfassen2 EG'));
          return 'BiteZusammenfassen2 EG';
          // } else if (experienceCount >= 2) {
          //   //saveChatHistory(stepExtractor(info.steps, 'alreadyCheckedEG'));
          //   console.log('bozorgtar as 2 ');
          //   return 'alreadyChecked EG';
        }
      },
    },
    // ======================================================  Picture 1 EG
    // =====================  AskToCheckCommentsEG
    {
      delay: 3000,
      id: 'AskToCheckComments EG',
      message: Steps.AskToCheckComments,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'okButton EG'));
        return 'okButton EG';
      },
    },
    // =====================  okButton
    {
      id: 'okButton EG',
      options: [
        {
          value: 'ok',
          label: `ok`,
          trigger: (info) => {
            // triggerInfo(
            //   info,
            //   'BiteZusammenfassenEG',
            //   '',
            //   'GenderClassification',
            //   'Male'
            // );
            saveChatHistory(stepExtractor(info.steps, 'BiteZusammenfassen EG'));
            return 'BiteZusammenfassen EG';
          },
        },
      ],
    },
    // ===================== BiteZusammenfassen1 EG
    {
      id: 'BiteZusammenfassen EG',
      message: Steps.BiteZusammenfassen,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'UserInput1 EG'));
        return 'UserInput1 EG';
      },
    },

    // ===================== UserInput1 EG ======= Here differentiate picture one or two !
    {
      id: 'UserInput1 EG',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Bitte gib eine etwas längere Antwort ein (mehr als 30 Zeichen).';
        }
        return true;
      },
      trigger: (info) => {
        sendExperienceCount();
        if (
          consumer.receivedImageInfo.image_meta_information.image_url ===
          'https://rias-insta-simulate.vercel.app/images/posts/shampoo.jpeg'
        ) {
          saveChatHistory(stepExtractor(info.steps, 'RacismAcknowledgement'));
          return 'RacismAcknowledgement';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'HautFarbe')); // color pen
          return 'HautFarbe';
        }
      },
    },
    // ===================== differentiate of CG and EG in image 1 !
    // RacismAcknowledgement
    {
      delay: 3000,
      id: 'RacismAcknowledgement',
      message: Steps.RacismAcknowledgement,
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'RacismAcknowledgementChoices')
        );
        return 'RacismAcknowledgementChoices';
      },
    },
    // =====================RacismAcknowledgementChoices EG
    {
      id: 'RacismAcknowledgementChoices',
      options: [
        {
          label: `Ja, das wusste ich`,
          value: 'Ja, das wusste ich',
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'HaareFassen'));
            return 'HaareFassen';
          },
        },
        {
          label: `Nein, das wusste ich nicht`,
          value: `Nein, das wusste ich nicht`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'HaareFassen'));
            return 'HaareFassen';
          },
        },
      ],
    },
    // ===================== HaareFassen
    {
      delay: 3000,
      id: 'HaareFassen',
      message: Steps.HaareFassen,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'HaareFassenChoices'));
        return 'HaareFassenChoices';
      },
    },
    // ===================== HaareFassenChoices
    {
      id: 'HaareFassenChoices',
      options: [
        {
          label: `Ja, das wusste ich`,
          value: 'Ja, das wusste ich',
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'NichtNormal'));
            return 'NichtNormal';
          },
        },
        {
          label: `Nein, das wusste ich nicht`,
          value: 'Nein, das wusste ich nicht',
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'NichtNormal'));
            return 'NichtNormal';
          },
        },
      ],
    },
    // ===================== NichtNormal
    {
      delay: 3000,
      id: 'NichtNormal',
      message: Steps.NichtNormal,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'NichtNormalChoices'));
        return 'NichtNormalChoices';
      },
    },
    // ===================== NichtNormalChoices EG
    {
      id: 'NichtNormalChoices',
      options: [
        {
          label: `Ja, das wusste ich`,
          value: 'Ja, das wusste ich',
          trigger: (info) => {
            if (experienceCount === 0) {
              saveChatHistory(
                stepExtractor(info.steps, 'AskToRightClickOtherImages1 EG')
              );
              return 'AskToRightClickOtherImages1 EG';
            } else {
              saveChatHistory(stepExtractor(info.steps, 'AskHighlight EG'));
              return 'AskHighlight EG';
            }
          },
        },
        {
          label: `Nein, das wusste ich nicht`,
          value: 'Nein, das wusste ich nicht',
          trigger: (info) => {
            if (experienceCount === 0) {
              saveChatHistory(
                stepExtractor(info.steps, 'AskToRightClickOtherImages1 EG')
              );
              return 'AskToRightClickOtherImages1 EG';
            } else {
              saveChatHistory(stepExtractor(info.steps, 'AskHighlight EG'));
              return 'AskHighlight EG';
            }
          },
        },
      ],
    },
    // ===================== AskToRightClickOtherImages1 EG =================
    {
      delay: 1000,
      id: 'AskToRightClickOtherImages1 EG',
      message:
        'Bitte sieh dir jetzt den zweiten Beitrag an. Klick dazu mit der rechten Maustaste auf das Bild und dann auf die Schaltfläche “COURAGE-Companion“.',
      trigger: (info) => {
        getExperienceCountAPICaller();
        saveChatHistory(stepExtractor(info.steps, 'end'));
        return 'end';
      },
    },
    // =============================================    Picture 2 EG
    // ===================== BiteZusammenfassen2 EG'
    {
      id: 'BiteZusammenfassen2 EG',
      message: Steps.BiteZusammenfassen,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'UserInput2 EG'));
        return 'UserInput2 EG';
      },
    },
    // ===================== UserInput2 EG
    {
      id: 'UserInput2 EG',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Bitte gib eine etwas längere Antwort ein (mehr als 30 Zeichen).';
        }
        return true;
      },
      trigger: (info) => {
        sendExperienceCount();
        if (
          consumer.receivedImageInfo.image_meta_information.image_url ===
          'https://rias-insta-simulate.vercel.app/images/posts/shampoo.jpeg'
        ) {
          saveChatHistory(stepExtractor(info.steps, 'RacismAcknowledgement'));
          return 'RacismAcknowledgement';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'HautFarbe'));
          return 'HautFarbe';
        }
      },
    },
    // ==============XX****xxxxxXXXX========================== special EG sec 2
    // =====================  HautFarbe
    {
      delay: 3000,
      id: 'HautFarbe',
      message: Steps.HautFarbe,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'HautFarbeChoices'));
        return 'HautFarbeChoices';
      },
    },
    // ===================== HautFarbeChoices
    {
      id: 'HautFarbeChoices',
      options: [
        {
          label: `Ja, das wusste ich`,
          value: 'Ja, das wusste ich',
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'x95ProzentKosmetic'));
            return 'x95ProzentKosmetic';
          },
        },
        {
          label: `Nein, das wusste ich nicht`,
          value: `Nein, das wusste ich nicht`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'x95ProzentKosmetic'));
            return 'x95ProzentKosmetic';
          },
        },
      ],
    },
    // ===================== x95ProzentKosmetic
    {
      delay: 3000,
      id: 'x95ProzentKosmetic',
      message: Steps.x95ProzentKosmetic,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'x95ProzentKosmeticChoices'));
        return 'x95ProzentKosmeticChoices';
      },
    },
    // ===================== x95ProzentKosmeticChoices
    {
      id: 'x95ProzentKosmeticChoices',
      options: [
        {
          label: `Ja, das wusste ich`,
          value: 'Ja, das wusste ich',
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'x92ProzentHautFarbe'));
            return 'x92ProzentHautFarbe';
          },
        },
        {
          label: `Nein, das wusste ich nicht`,
          value: `Nein, das wusste ich nicht`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'x92ProzentHautFarbe'));
            return 'x92ProzentHautFarbe';
          },
        },
      ],
    },
    // ===================== x92ProzentHautFarbe
    {
      delay: 3000,
      id: 'x92ProzentHautFarbe',
      message: Steps.x92ProzentHautFarbe,
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'x92ProzentHautFarbeChoices')
        );
        return 'x92ProzentHautFarbeChoices';
      },
    },
    // ===================== x92ProzentHautFarbeChoices
    {
      id: 'x92ProzentHautFarbeChoices',
      options: [
        {
          label: `Ja, das wusste ich`,
          value: 'Ja, das wusste ich',
          trigger: (info) => {
            if (experienceCount === 0) {
              saveChatHistory(
                stepExtractor(info.steps, 'AskToRightClickOtherImages1 EG')
              );
              return 'AskToRightClickOtherImages1 EG';
            } else {
              saveChatHistory(stepExtractor(info.steps, 'AskHighlight EG'));
              return 'AskHighlight EG';
            }
          },
        },
        {
          label: `Nein, das wusste ich nicht`,
          value: 'Nein, das wusste ich nicht',
          trigger: (info) => {
            if (experienceCount === 0) {
              saveChatHistory(
                stepExtractor(info.steps, 'AskToRightClickOtherImages1 EG')
              );
              return 'AskToRightClickOtherImages1 EG';
            } else {
              saveChatHistory(stepExtractor(info.steps, 'AskHighlight EG'));
              return 'AskHighlight EG';
            }
          },
        },
      ],
    },
    //'AskHighlight EG';
    // ===================== AskHighlightEG
    {
      delay: 5000,
      id: 'AskHighlight EG',
      message: Steps.AskHighlight,
      trigger: () => {
        return 'Highlighter EG';
      },
    },
    // =====================Highlighter EG
    {
      delay: 15000,
      id: 'Highlighter EG',
      component: (
        <HighlighterHandler finishHighlightState={finishHighlightState} />
      ),
      waitAction: true,
      asMessage: true,
    },
    // ===================== returnAfterHighlight EG
    {
      delay: 2000,
      id: 'returnAfterHighlight EG',
      message: ' ',

      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'Fertig EG'));
        return 'Fertig EG';
      },
    },
    // ===================== Confirm EG
    {
      id: 'Fertig EG',
      options: [
        {
          label: `Weiter geht's!`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, '3Möglichkeiten EG'));
            setFinishHighlightState(true);
            console.log('finishHighlightState');
            console.log(finishHighlightState);
            return '3Möglichkeiten EG';
          },
        },
      ],
    },
    // ===================== Du hast nun 3 Möglichkeiten. Für was entscheidest du dich?
    {
      delay: 4000,
      id: '3Möglichkeiten EG',
      message: 'Du hast nun 3 Möglichkeiten. Für was entscheidest du dich?',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'threeOptions EG'));
        return 'threeOptions EG';
      },
    },
    // ===================== threeOptions
    {
      id: 'threeOptions EG',
      options: [
        {
          value: 'Ich like den Beitrag',
          label: `Ich like den Beitrag`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'GutGemacht EG'));
            return 'GutGemacht EG';
          },
          // triggerInfo(
          //   info,
          //   'BiteZusammenfassen EG',
          //   '',
          //   'GenderClassification',
          //   'Male'
          // );
        },
        {
          value: 'Ich melde den Beitrag',
          label: `Ich melde den Beitrag`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'GutGemacht EG'));
            return 'GutGemacht EG';
          },
        },
        {
          value: 'Ich mache nichts',
          label: `Ich mache nichts`,
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'GutGemacht EG'));
            return 'GutGemacht EG';
          },
        },
      ],
    },
    // ============== Gut Gemacht EG
    {
      id: 'GutGemacht EG',
      message:
        'Gut gemacht! Danke, dass du mit mir gechattet hast. Meine letzte Frage lautet: Wie bewertest du mich insgesamt? Was gefiel dir gut, was weniger?',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'UserInput3 EG'));
        return 'UserInput3 EG';
      },
    },
    // ===================== UserInput3 EG
    {
      id: 'UserInput3 EG',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Bitte gib eine etwas längere Antwort ein (mehr als 30 Zeichen).';
        }
        return true;
      },
      trigger: (info) => {
        sendExperienceCount();
        saveChatHistory(stepExtractor(info.steps, 'Fertig'));
        return 'Fertig';
      },
    },
    // =====================Fertig
    {
      delay: 4000,
      id: 'Fertig',
      message:
        'Fertig! Bitte klicke auf den folgenden Link, um zum Fragebogen zurückzukehren. Bis bald!',
      trigger: 'SociLink Component EG',
    },
    // =====================SociLink Component EG
    {
      delay: 3000,
      id: 'SociLink Component EG',
      component: (
        <button
          className={'btn'}
          onClick={() => {
            clickLoggerForSociServerButton(
              consumer.receivedImageInfo.image_meta_information.image_url
            );
            window.open(
              'https://www.soscisurvey.de/informationtransfer2/',
              '_blank'
            );
          }}
        >
          zur Online-Umfrage
        </button>
      ),
      trigger: 'End',
    },
    // ===================== End
    {
      delay: 1000,
      id: 'End',
      message: 'Ciao ! ',
      end: true,
    },
  ];

  const theme = {
    //
    background: '#fff',
    fontFamily: 'Helvetica Neue',
    fontSize: '16vw',
    headerBgColor: '#FF9001',
    headerFontColor: '#fff',
    headerFontSize: '19px',
    botBubbleColor: '#FF9001',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    height: '800vw',
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#abaab3', height: 500 }}>
      {consumer.receivedImageInfo &&
        consumer.receivedImageInfo.image_meta_information &&
        (oldConversation && chatbotMountStatus ? (
          <ThemeProvider theme={theme}>
            {/* {consumer.receivedImageInfo.image_meta_information.image_url} */}
            <ChatBot
              botAvatar={Emoji}
              userAvatar={userAvatar}
              steps={conversationSteps}
              headerTitle={'Companion BOT'}
              // width={'inline-block'}
              width={'100%'}
              height={'800px'}
            />
          </ThemeProvider>
        ) : (
          <Loading />
        ))}
    </div>
  );
};

export default Companion;

const HighlighterHandler = (props) => {
  /**  console.log("props", props); */

  const [chatState, setChatState] = React.useState(' ');
  const [component, setComponent] = React.useState(null);
  const fetchData = async () => {
    try {
      const result = 'highlightCase';
      if (result) {
        switch (result) {
          case 'highlightCase': {
            if (props.step.id === 'Highlighter CG') {
              setComponent(
                <Highlighter
                  finishHighlightState={props.finishHighlightState}
                />
              );
              props.triggerNextStep({
                trigger: 'returnAfterHighlight CG',
              });
            } else {
              setComponent(
                <Highlighter
                  finishHighlightState={props.finishHighlightState}
                />
              );
              props.triggerNextStep({ trigger: 'returnAfterHighlight EG' });
            }
            break;
          }
          default:
            setChatState(
              'Thats not In my RAM right now 😥😬😀! Lets start to play in environment, If you agree please choice one image and right click on it?'
            );
            props.triggerNextStep({ trigger: 'userInput' });
        }
      } else {
        setChatState(
          'Thats not In my RAM right now 😥😬😀! Lets start to play in environment, If you agree please choice one image and right click on it'
        );
        props.triggerNextStep({ trigger: 'returnAfterHighlight CG' });
      }
    } catch (err) {
      setChatState('Response is not unavailable :-( catch Error');
      console.log(JSON.stringify(err));
      props.triggerNextStep({ trigger: 'userInput' });
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {chatState ? chatState : <Loading />}
      {component}
    </>
  );
};
