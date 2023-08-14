import React from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
/***
 ChatBot is export default
 Loading is simple export  
 ***/
//import FetchFromWitAI from "./FetchFromWitAI";
import serverSideAddresses from '../../utils/ServerSideAddress.js';
import companionContext from '../../context.js';
import Emoji from './ImagesAndICONS/logo512.png';

import GuideRecButton from './ImagesAndICONS/GuideRecButton.png';
import GuideRecButton2 from './ImagesAndICONS/GuideRecButton2.png';
import GuideRecButton3 from './ImagesAndICONS/GuideRecButton3.png';

// import Steps from './CompanionLanguages/Steps/EnSteps.js';
import Steps from './CompanionLanguages/Steps/ItSteps.js';
import googleLens from './ImagesAndICONS/googleLens.png';
import googleLensZoom from './ImagesAndICONS/googleLensZoom.png';

import Fact from './ImagesAndICONS/Fact.jpg';
import Fake from './ImagesAndICONS/Fake.jpg';
import Controversial from './ImagesAndICONS/Controversial.jpg';
import AnalysisTab from './ImagesAndICONS/Analysis.png';
import goldenBadge from './ImagesAndICONS/goldenBadge.png';

import { stepExtractor } from './stepExtractor';
import getExperienceCountAPICaller from './getExperienceCountAPICaller';
import experienceIdExtractor from './experienceIdExtractor';
//import Steps from "./Steps/DuSteps.js";
//import Steps from "./Steps/ItSteps.js";
//import Steps from "./Steps/SpSteps.js";
//src/container/Companion/CompanionLanguages/Steps/DuStepsInstaCoure.js

const CompanionCour = () => {
  getExperienceCountAPICaller();
  const consumer = React.useContext(companionContext);
  var experienceCount = Number(localStorage.getItem('experienceCount'));
  const [oldConversation, setOldConversation] = React.useState(null);
  const [chatbotMountStatus, setChatbotMountStatus] = React.useState(false);

  const sendExperienceCount = async () => {
    const userToken = localStorage.getItem('companionUserToken');
    const experienceId = experienceIdExtractor(userToken);
    await sendExperienceCountAPI(userToken, experienceId);
    console.log('sendExperienceCountAPI activated count ++');
    getExperienceCountAPICaller();
  };
  const sendExperienceCountAPI = async (userToken, experienceId) => {
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
              console.log('successfully chat sent to backend' + msg);
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
      }) // Probablimente
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
      console.log('response of saving vote is', resp);
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
  const reformatOldConversationFunction = (res) => {
    getExperienceCountAPICaller();
    if (res.length > 0) {
      let reformatOldConversation = {
        id: res[0].chatHistory[0].id,
        message: res[0].chatHistory[0].message,
        trigger: res[0].chatHistory[0].trigger,
      };
      setOldConversation(reformatOldConversation);
    } else {
      setOldConversation({
        id: 'Greeting',
        message: `${Steps.Greeting}`,
        trigger: (info) => {
          saveChatHistory(stepExtractor(info.steps, 'ShowThumbnail'));
          return 'ShowThumbnail';
        },
      });
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
   *     ================== Start STEPS ==================
   */
  const conversationSteps = [
    oldConversation,

    //ShowThumbnail
    {
      delay: 2000,
      id: 'ShowThumbnail',
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
        console.log('ShowThumbnail ============== info');
        console.log(experienceCount);
        saveChatHistory(stepExtractor(info.steps, 'Security'));
        return 'Security';
      },
    },

    //Security
    {
      id: 'Security',
      delay: 3000,
      message: `${Steps.Security}`,
      trigger: (info) => {
        if (experienceCount === 0) {
          // local storage gives string
          if (
            experienceCount === 0 &&
            experienceCount !== 1 &&
            experienceCount !== 2 &&
            experienceCount !== 3 &&
            experienceCount !== 4 &&
            experienceCount <= 5
          ) {
            saveChatHistory(stepExtractor(info.steps, 'AskAboutGender'));
            return 'AskAboutGender';
          }
        } else if (experienceCount >= 1) {
          saveChatHistory(stepExtractor(info.steps, 'AskToClassify'));
          return 'AskToClassify';
        }
      },
    },
    //AskAboutGender
    {
      id: 'AskAboutGender',
      delay: 2000,
      message: `${Steps.AskAboutGender}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'GenderClassification'));
        return 'GenderClassification';
      },
    },
    //"GenderClassification"
    {
      id: 'GenderClassification',
      options: [
        {
          value: 'Male',
          label: `${Steps.Male}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAboutEducation',
              '',
              'GenderClassification',
              'Male'
            );
            return 'AskAboutEducation';
          },
        },
        {
          value: 'Female',
          label: `${Steps.Female}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAboutEducation',
              '',
              'GenderClassification',
              'Female'
            );
            return 'AskAboutEducation';
          },
        },
        {
          value: 'Other',
          label: `${Steps.Others}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAboutEducation',
              '',
              'GenderClassification',
              'Other'
            );
            return 'AskAboutEducation';
          },
        },
      ],
    },
    // "AskAboutEducation"
    {
      id: 'AskAboutEducation',
      delay: 2000,
      message: `${Steps.AskAboutEducation}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'EducationClassification'));
        return 'EducationClassification';
      },
    },
    // EducationClassification
    {
      id: 'EducationClassification',
      options: [
        {
          value: 'Master’s degree or above',
          label: `${Steps.MastersDegreeOrAbove}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAgeGroupe',
              '',
              'EducationClassification',
              'MastersDegreeOrAbove'
            );
            return 'AskAgeGroupe';
          },
        },
        {
          value: 'Bachelor’s degree',
          label: `${Steps.BachelorDegree}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAgeGroupe',
              '',
              'EducationClassification',
              'Bachelor’s degree'
            );
            return 'AskAgeGroupe';
          },
        },
        {
          value: 'Others',
          label: `${Steps.Others}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAgeGroupe',
              '',
              'EducationClassification',
              'Others'
            );
            return 'AskAgeGroupe';
          },
        },
        {
          value: 'Highschool',
          label: `${Steps.Highschool}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAgeGroupe',
              '',
              'EducationClassification',
              'Highschool'
            );
            return 'AskAgeGroupe';
          },
        },
        {
          value: 'elementary school',
          label: `${Steps.elementarySchool}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAgeGroupe',
              '',
              'EducationClassification',
              'elementary school'
            );
            return 'AskAgeGroupe';
          },
        },
        {
          value: 'I prefer not to say',
          label: `${Steps.PreferNotToSay}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskAgeGroupe',
              '',
              'EducationClassification',
              'Other'
            );
            return 'AskAgeGroupe';
          },
        },
      ],
    },
    // AskAgeGroupe
    {
      id: 'AskAgeGroupe',
      delay: 2000,
      message: `${Steps.AskAgeGroupe}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'AgeGroupeClassification'));
        return 'AgeGroupeClassification';
      },
    },
    // AgeGroupeClassification
    {
      id: 'AgeGroupeClassification',
      options: [
        {
          value: '12-17',
          label: `${Steps.Age1}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskToClassify',
              '',
              'AgeGroupeClassification',
              '12-17'
            );
            return 'AskToClassify';
          },
        },
        {
          value: '18-26',
          label: `${Steps.Age2}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskToClassify',
              '',
              'AgeGroupeClassification',
              '18-26'
            );
            return 'AskToClassify';
          },
        },
        {
          value: '26-35',
          label: `${Steps.Age3}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskToClassify',
              '',
              'AgeGroupeClassification',
              '26-35'
            );
            return 'AskToClassify';
          },
        },
        {
          value: '35-older',
          label: `${Steps.Age4}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'AskToClassify',
              '',
              'AgeGroupeClassification',
              '35-older'
            );
            return 'AskToClassify';
          },
        },
      ],
    },

    // "AskToClassify" 1
    {
      id: 'AskToClassify',
      delay: 2000,
      message: `${Steps.AskToClassify}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'Classification'));
        return 'Classification';
      },
    },
    //"Classification"
    {
      id: 'Classification',
      options: [
        {
          value: 'Fake',
          label: `${Steps.Fake}`,
          trigger: (info) => {
            triggerInfo(info, 'confirmUserVote', 'Fake', 'Classification', '');
            return 'confirmUserVote';
          },
          /// For the second round it should jump this section to google
        },
        {
          value: 'probably Fake',
          label: `${Steps.probablyFake}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'confirmUserVote',
              'probably Fake',
              'Classification',
              ''
            );
            return 'confirmUserVote';
          },
        },
        {
          value: 'Not Sure',
          label: `${Steps.NotSure}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'confirmUserVote',
              'Not Sure',
              'Classification',
              ''
            );
            return 'confirmUserVote';
          },
        },
        {
          value: 'Probably Real',
          label: `${Steps.ProbablyReal}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'confirmUserVote',
              'Probably Real',
              'Classification',
              ''
            );
            return 'confirmUserVote';
          },
        },
        {
          value: 'Real',
          label: `${Steps.Real}`,
          trigger: (info) => {
            triggerInfo(info, 'confirmUserVote', 'Real', 'Classification', '');
            return 'confirmUserVote';
          },
        },
      ],
    },
    {
      id: 'confirmUserVote',
      message: `OK! Pensi che l'immagine del post sia " {previousValue} "! Allora vediamo i contenuti sul web !`,
      delay: 3000,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'CheckTheRISLinks'));
        return 'CheckTheRISLinks';
      },
    },

    // GetUserOpinion
    // {
    //   id: 'GetUserOpinion',
    //   delay: 2000,
    //   message: `${Steps.GetUserOpinion}`, // must be added here
    //   trigger: (info) => {
    //     saveChatHistory(stepExtractor(info.steps, 'CheckTheRISLinks'));
    //     return 'CheckTheRISLinks';
    //   },
    // },
    // "userInputTextIdea"
    // {
    //   id: 'userInputTextIdea',
    //   user: true,
    //   validator: (value) => {
    //     if (value.length < 25) {
    //       return 'Bitte antworten Sie länger als 25 Zeichen';
    //     }
    //     return true;
    //   },
    //   trigger: (info) => {
    //     console.log(info);
    //     saveChatHistory(stepExtractor(info.steps, 'CheckTheRISLinks'));
    //     return 'CheckTheRISLinks';
    //   },
    // },

    // CheckTheRISLinks // should remain in all steps!
    {
      // TODO: correct the font
      id: 'CheckTheRISLinks',
      delay: 5000,
      message: `${Steps.CheckTheRISLinks}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ShowUserGuide1'));
        console.log(
          'ShowUserGuide1 ================================================================='
        );
        return 'ShowUserGuide1';
      },
    },
    // "ShowUserGuide1"  // should remain in all steps!
    {
      id: 'ShowUserGuide1',
      delay: 4000,
      component: (
        <img
          src={GuideRecButton}
          style={{
            width: '80%',
            height: 'auto',
            border: '6px solid #fffff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        console.log('=============ShowUserGuide1');
        let x1 = Date.now();
        console.log(x1);
        localStorage.setItem('x1', x1);
        saveChatHistory(stepExtractor(info.steps, 'AskToComeBackAfterRIS'));
        return 'AskToComeBackAfterRIS';
      },
    },
    //AskToComeBackAfterRIS
    {
      delay: 3000,
      id: 'AskToComeBackAfterRIS',
      message:
        'Torna alla scheda "COMPANION", dove ti aspetto, e qui premi il pulsante "OK".',
      trigger: (info) => {
        console.log('=============ShowUserGuide1');
        let x1 = Date.now();
        console.log(x1);
        localStorage.setItem('x1', x1);
        saveChatHistory(stepExtractor(info.steps, 'Ok'));
        return 'Ok';
      },
    },
    // Ok ! // for count != 0 we dont show the guides! if 1 jump ===>google else  if _2 Jump ===> ChangedTheirIdeaAfterRIV
    {
      delay: 3000,
      id: 'Ok',
      options: [
        {
          delay: 1000,
          value: 'Ok!',
          label: 'Ok',
          trigger: (info) => {
            if (experienceCount === 0) {
              saveChatHistory(
                stepExtractor(info.steps, 'AskIfTheUserCheckedRIVTab')
              );
              return 'AskIfTheUserCheckedRIVTab';
            } else if (experienceCount === 1) {
              saveChatHistory(stepExtractor(info.steps, 'GoogleRIVimageGuide'));
              return 'GoogleRIVimageGuide';
            } else if (experienceCount >= 2) {
              saveChatHistory(stepExtractor(info.steps, 'GoogleRIVimageGuide'));
              return 'GoogleRIVimageGuide';
            }
          },
        },
      ],
    },
    // AskIfTheUserCheckedRIVTab  // should be there for just a first loop!
    {
      id: 'AskIfTheUserCheckedRIVTab',
      delay: 3000,
      message: `${Steps.AskIfTheUserCheckedRIVTab}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'GuideRecButton2'));
        return 'GuideRecButton2';
      },
    },
    // "GuideRecButton2"
    {
      id: 'GuideRecButton2',
      delay: 2000,
      component: (
        <img
          src={GuideRecButton2}
          style={{
            width: '56%',
            height: '190px',
            border: '6px solid #fffff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        console.log('local storage x1');
        console.log(localStorage.getItem('x1'));
        let x2 = Date.now();
        let biasStepTime = localStorage.getItem('x1');
        console.log('x2 time');
        console.log(x2);
        let dif = x2 - biasStepTime;
        console.log('dif');
        console.log(dif / 1000);
        if (dif < 20000) {
          saveChatHistory(stepExtractor(info.steps, 'BiasUser'));
          return 'BiasUser';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'GuideRecButton3'));
          return 'GuideRecButton3';
        }
      },
    },
    // "BiasUser"
    {
      id: 'BiasUser',
      delay: 6000,
      message: `${Steps.BiasUser}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'OkAfterBias'));
        return 'OkAfterBias';
      },
    },
    //"OkAfterBias"
    {
      id: 'OkAfterBias',
      options: [
        {
          value: 'Ok I checked again!',
          label: 'Ok, ho controllato di nuovo',
          trigger: (info) => {
            saveChatHistory(stepExtractor(info.steps, 'GuideRecButton3'));
            return 'GuideRecButton3';
          },
        },
      ],
    },
    // GuideRecButton3
    {
      id: 'GuideRecButton3',
      delay: 4000,
      component: (
        <img
          src={GuideRecButton3}
          style={{
            width: '190px',
            height: '190px',
            border: '6px solid #fffff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'AskIfTheUserCheckedRIVTabOptions')
        );
        return 'AskIfTheUserCheckedRIVTabOptions';
      },
    },
    // AskIfTheUserCheckedRIVTabOptions
    {
      id: 'AskIfTheUserCheckedRIVTabOptions',
      options: [
        {
          value: `${Steps.YesCheckedRIS}`,
          label: `${Steps.YesCheckedRIS}`,
          trigger: (info) => {
            // console
            // console.log(experienceCount);
            if (experienceCount === 0) {
              saveChatHistory(
                stepExtractor(info.steps, 'InformationAboutGoogleRIV')
              );
              return 'InformationAboutGoogleRIV';
            } else {
              saveChatHistory(
                stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV')
              );
              return 'ChangedTheirIdeaAfterRIV';
            }
          },
        },
        {
          value: `${Steps.NoCheckedRIS2}`,
          label: `${Steps.NoCheckedRIS2}`,
          trigger: (info) => {
            saveChatHistory(
              stepExtractor(
                info.steps,
                'AskToCheckRIVKeywordsAndLinksSecondTime'
              )
            );
            return 'AskToCheckRIVKeywordsAndLinksSecondTime';
          },
        },
      ],
    },
    // "InformationAboutGoogleRIV"
    {
      delay: 4000,
      id: 'InformationAboutGoogleRIV',
      message: `${Steps.InformationAboutGoogleRIV}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'GoogleRIVimageGuide'));
        return 'GoogleRIVimageGuide';
      },
    },
    // GoogleRIVimageGuide
    {
      delay: 4000,
      id: 'GoogleRIVimageGuide',
      component: (
        <div>
          <img
            src={googleLens}
            style={{
              width: '90%',
              height: 'auto',
              border: '8px solid #fff',
              margin: '5px',
            }}
            alt={'target'}
          />
          <img
            src={googleLensZoom}
            style={{
              width: '90%',
              height: 'auto',
              border: '8px solid #fff',
              margin: '5px',
            }}
            alt={'target'}
          />
        </div>
      ),
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV'));
        return 'ChangedTheirIdeaAfterRIV';
      },
    },
    // AskToCheckRIVKeywordsAndLinksSecondTime
    {
      id: 'AskToCheckRIVKeywordsAndLinksSecondTime',
      delay: 8000,
      message: `${Steps.AskToCheckRIVKeywordsAndLinks}`,
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'ConfirmButtonOfCheckingLens')
        );
        return 'ConfirmButtonOfCheckingLens';
      },
    },
    // Ok I checked Keywords, google lens and provided links or other links
    {
      id: 'ConfirmButtonOfCheckingLens',
      delay: 3000,
      message:
        'Ok, ho controllato le parole chiave, Google Lens e i collegamenti forniti o altri collegamenti ',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV'));
        return 'ChangedTheirIdeaAfterRIV';
      },
    },
    // ChangedTheirIdeaAfterRIV
    {
      delay: 10000,
      id: 'ChangedTheirIdeaAfterRIV',
      message: `${Steps.ChangedTheirIdeaAfterRIV}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaOptions'));
        return 'ChangedTheirIdeaOptions';
      },
    },
    // ChangedTheirIdeaOptions
    {
      id: 'ChangedTheirIdeaOptions',
      options: [
        {
          value: `${Steps.YesChangedTheirIdeaOptions}`,
          label: `${Steps.YesChangedTheirIdeaOptions}`,
          trigger: (info) => {
            saveChatHistory(
              stepExtractor(info.steps, 'ClassificationForSecondTime')
            );
            return 'ClassificationForSecondTime';
          },
        },
        {
          value: `${Steps.NoChangedTheirIdeaOptions}`,
          label: `${Steps.NoChangedTheirIdeaOptions}`,
          trigger: (info) => {
            saveChatHistory(
              stepExtractor(info.steps, 'FinishWithTheImageConversation')
            );
            return 'FinishWithTheImageConversation';
          },
        },
      ],
    },
    // ClassificationForSecondTime
    {
      id: 'ClassificationForSecondTime',
      message: `${Steps.ClassificationForSecondTime}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'Classification2'));
        return 'Classification2';
      },
    },
    // Classification 2
    {
      id: 'Classification2',
      options: [
        {
          value: 'Fake',
          label: `${Steps.Fake}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'ReasonBehindChangingIdea',
              'Fake',
              'Classification2',
              ''
            );
            return 'ReasonBehindChangingIdea';
          },
        },
        {
          value: 'probably Fake',
          label: `${Steps.probablyFake}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'ReasonBehindChangingIdea',
              'probably Fake',
              'Classification2',
              ''
            );
            return 'ReasonBehindChangingIdea';
          },
        },
        {
          value: 'Not Sure',
          label: `${Steps.NotSure}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'ReasonBehindChangingIdea',
              'Not Sure',
              'Classification2',
              ''
            );
            return 'ReasonBehindChangingIdea';
          },
        },
        {
          value: 'Probably Real',
          label: `${Steps.ProbablyReal}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'ReasonBehindChangingIdea',
              'Probably Real',
              'Classification2',
              ''
            );
            return 'ReasonBehindChangingIdea';
          },
        },
        {
          value: 'Real',
          label: `${Steps.Real}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'ReasonBehindChangingIdea',
              'Real',
              'Classification2',
              ''
            );
            return 'ReasonBehindChangingIdea';
          },
        },
      ],
    },
    // Reason Behind Changing Idea
    {
      id: 'ReasonBehindChangingIdea',
      message: `${Steps.ReasonBehindChangingIdea}`,
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'reasonForChangingClassification')
        );
        return 'reasonForChangingClassification';
      },
    },
    {
      id: 'reasonForChangingClassification',
      options: [
        {
          value: 'FactFromRIV&Keywords',
          label:
            'Ho visto il contenuto della "scheda Recommended" (siti con immagini e parole chiave simili) e dal confronto ho tratto una nuova conclusione  ',
          trigger: (info) => {
            triggerInfo(
              info,
              'FinishWithTheImageConversation',
              'FactFromRIV&Keywords',
              'ReasonChangesClassification',
              ''
            );
            return 'FinishWithTheImageConversation';
          },
        },
        {
          value: 'FoundContentsFromGoogleLensAndGoogle',
          label:
            'Ho trovato i contenuti reali con Google Lens/Ricerca Google e li ho confrontati ',
          trigger: (info) => {
            triggerInfo(
              info,
              'FinishWithTheImageConversation',
              'FoundContentsFromGoogleLens/Search',
              'ReasonChangesClassification',
              ''
            );
            return 'FinishWithTheImageConversation';
          },
        },
        {
          value: 'feelingChanges',
          label: `La mia opinione riguardo all'immagine è cambiata`,
          trigger: (info) => {
            triggerInfo(
              info,
              'FinishWithTheImageConversation',
              'feelingChanges',
              'ReasonChangesClassification',
              ''
            );
            return 'FinishWithTheImageConversation';
          },
        },
        {
          value: 'OtherReasons',
          label: `Altri Motivi`,
          trigger: (info) => {
            triggerInfo(
              info,
              'userInputTextIdea2',
              'OtherReasons',
              'ReasonChangesClassification',
              ''
            );
            return 'userInputTextIdea2';
          },
        },
      ],
    },

    // userInputTextIdea2
    {
      id: 'userInputTextIdea2',
      user: true,
      validator: (value) => {
        if (value.length < 25) {
          return 'Per favore rispondi inserendo più di 25 caratteri';
        }
        return true;
      },
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'FinishWithTheImageConversation')
        );
        //return "YesManipulated1";
        return 'FinishWithTheImageConversation';
      },
    },
    // FinishWithTheImageConversation ==>  sendExperienceCount()
    {
      id: 'FinishWithTheImageConversation',
      message: 'Super',
      /// For
      trigger: (info) => {
        console.log('FinishWithTheImageConversation experienceCount');
        var experienceCountxxxx = Number(
          localStorage.getItem('experienceCount')
        );
        console.log('experienceCountxxxx');
        console.log(experienceCountxxxx);
        console.log(typeof experienceCountxxxx);
        sendExperienceCount();
        if (experienceCountxxxx >= 4) {
          saveChatHistory(stepExtractor(info.steps, 'ifFinishedGoldenBadge'));
          return 'ifFinishedGoldenBadge';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'beforeEnd'));
          console.log(
            'FinishWithTheImageConversation  ====== call send and get '
          );
          return 'NextImage';
        }
      },
    },
    // AskToCheckTheAnalysisTab
    {
      delay: 2000,
      id: 'NextImage',
      message: `Bene, se finisci il percorso con tutte e cinque le foto, riceverai un premio 🤩 e otterrai un voto dagli esperti!!`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'beforeEnd'));
        return 'beforeEnd';
      },
    },
    // "ask to check the analysis tab for each picture"
    // ifFinishedGoldenBadge
    // {
    //   delay: 2000,
    //   id: 'AskToCheckTheAnalysisTab',
    //   message: `${Steps.AskToCheckTheAnalysisTab}`,
    //   trigger: (info) => {
    //     saveChatHistory(stepExtractor(info.steps, 'GuideForTheAnalysisTab'));
    //     return 'GuideForTheAnalysisTab';
    //   },
    // },
    // // 'Guide For The Analysis Tab'
    // {
    //   id: 'GuideForTheAnalysisTab',
    //   delay: 3000,
    //   component: (
    //     <img
    //       src={AnalysisTab}
    //       style={{
    //         width: '75%',
    //         height: 'auto',
    //         border: '6px solid #fff',
    //         margin: '3px',
    //       }}
    //       alt={'target'}
    //     />
    //   ),
    //   trigger: (info) => {
    //     saveChatHistory(
    //       stepExtractor(info.steps, 'CommentAboutTheAnalysisTab')
    //     );
    //     return 'CommentAboutTheAnalysisTab';
    //   },
    // },
    // // 'Do you want to add any comment ? If you could change any of your previous vote which post was thant and what is your new vote then ?'
    // {
    //   delay: 5000,
    //   id: 'CommentAboutTheAnalysisTab',
    //   message: `Möchtest du einen Kommentar hinzufügen? Wenn du eine deiner vorherigen Stimmen nach dem Urteil anderer in der Registerkarte "Analyse" ändern könntest, welchen Beitrag möchtest du dann ändern? wie lautet dann deine neue Stimme?`,
    //   trigger: (info) => {
    //     saveChatHistory(stepExtractor(info.steps, 'userInputAfterAnalysis'));
    //     return 'userInputAfterAnalysis';
    //   },
    // },
    // // userInputAfterAnalysis
    // {
    //   id: 'userInputAfterAnalysis',
    //   user: true,
    //   validator: (value) => {
    //     if (value.length < 10) {
    //       return 'Please put the answer bit longer than 40 characters';
    //     }
    //     return true;
    //   },
    //   trigger: (info) => {
    //     console.log(info);
    //     saveChatHistory(stepExtractor(info.steps, 'ifFinishedGoldenBadge'));
    //     return 'ifFinishedGoldenBadge';
    //   },
    // },

    // if finished Golden Badge!
    {
      id: 'ifFinishedGoldenBadge',
      component: (
        <img
          src={goldenBadge}
          style={{
            width: '70%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        console.log(info);
        saveChatHistory(
          stepExtractor(info.steps, 'askUserIfTheyKnowRISBefore')
        );
        return 'askUserIfTheyKnowRISBefore';
      },
    },

    // askUserIfTheyKnowRISBefore
    {
      id: 'askUserIfTheyKnowRISBefore',
      message: Steps.askUserIfTheyKnowRISBefore,
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'userInputIfTheyKnowRISBefore')
        );
        return 'userInputIfTheyKnowRISBefore';
      },
    },
    // "userInputIfTheyKnowRISBefore" Yes no
    {
      id: 'userInputIfTheyKnowRISBefore',
      options: [
        {
          value: 'yes I tried before to find fake picture',
          label: `sì, ho provato prima a trovare un'immagine falsa`,
          trigger: (info) => {
            triggerInfo(
              // (info, nextStep, vote, stepID, demographicsVote)
              info,
              'expertOpinion',
              '',
              'yes I tried before to find fake picture'
            );
            return 'ExpertBadges';
          },
        },
        {
          value: 'I never did myself',
          label: `Non l'ho mai fatto io`,
          trigger: (info) => {
            triggerInfo(
              info,
              'expertOpinion',
              '',
              'userInputIfTheyKnowRISBefore',
              'I never did myself'
            );
            return 'ExpertBadges';
          },
        },
      ],
    },

    // ExpertBadges
    {
      // delay: 1000,
      id: 'ExpertBadges',
      component: <ExpertBadgesHandler />,
      waitAction: true,
      asMessage: true,
    },
    // Did you learn something new?

    {
      // delay: 30000,
      id: 'ifUserLearnedSth',
      message: 'Hai imparato qualcosa di nuovo con me oggi?',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ifUserLearnedSthInput'));
        return 'ifUserLearnedSthInput';
      },
    },
    {
      id: 'ifUserLearnedSthInput',
      options: [
        {
          value: 'Yes',
          label: `Si!`,
          trigger: (info) => {
            triggerInfo(
              // (info, nextStep, vote, stepID, demographicsVote)
              info,
              'askUserOpinionAboutVLC',
              '',
              'Yes'
            );
            return 'askUserOpinionAboutVLC';
          },
        },
        {
          value: 'No',
          label: `Veramente no!`,
          trigger: (info) => {
            triggerInfo(
              info,
              'askUserOpinionAboutVLC',
              '',
              'userInputIfTheyKnowRISBefore',
              'No'
            );
            return 'askUserOpinionAboutVLC';
          },
        },
      ],
    },
    // askUserOpinionAboutVLC
    {
      id: 'askUserOpinionAboutVLC',
      message: Steps.askUserOpinionAboutVLC,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'userInputOpinionAboutVLC'));
        return 'userInputOpinionAboutVLC';
      },
    },
    //userInputOpinionAboutVLC
    {
      id: 'userInputOpinionAboutVLC',
      user: true,
      validator: (value) => {
        if (value.length < 20) {
          return 'Per favore rispondi inserendo più di 20 caratteri';
        }
        return true;
      },
      trigger: (info) => {
        console.log(info);
        saveChatHistory(stepExtractor(info.steps, 'beforeEnd'));
        return 'beforeEnd';
      },
    },
    //beforeEnd
    {
      id: 'beforeEnd',
      message: () => {
        if (experienceCount === 0) {
          return `${Steps.FinishWithTheImageConversation} immagini rimanenti: 4`;
        } else if (experienceCount === 1) {
          return `${Steps.FinishWithTheImageConversation} immagini rimanenti: 3`;
        } else if (experienceCount === 2) {
          return `${Steps.FinishWithTheImageConversation} immagini rimanenti: 2`;
        } else if (experienceCount === 3) {
          return `${Steps.FinishWithTheImageConversation} immagini rimanenti: 1`;
        } else if (experienceCount >= 4) {
          return 'Non restano altre immagini, Ciao amico mio! Grazie, e per favore, non dimenticare di disabilitarli !!!!!!';
        }
      },
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'end wor  ds'));
        return 'end words';
      },
    },
    // End
    {
      id: 'end words',
      component: <div> </div>,
      end: true,
    },
  ];

  const theme = {
    //
    // background: '#fff',
    // fontFamily: 'Helvetica Neue',
    fontSize: '20vw',
    // headerBgColor: '#FF9001',
    // headerFontColor: '#fff',
    // headerFontSize: '19px',
    // botBubbleColor: '#FF9001',
    // botFontColor: '#fff',
    // userBubbleColor: '#fff',
    // userFontColor: '#4a4a4a',
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#07a39e',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botFontSize: '20vw',
    userFontSize: '20vw',
    botBubbleColor: '#07a39e',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    height: '800vw',
  };

  return (
    <div Style={{ width: '100%', backgroundColor: '#abaab3', height: 500 }}>
      {consumer.receivedImageInfo &&
        consumer.receivedImageInfo.image_meta_information &&
        (oldConversation && chatbotMountStatus ? (
          <ThemeProvider theme={theme}>
            <ChatBot
              botAvatar={Emoji}
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

export default CompanionCour;

function ExpertBadges() {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>
        {' '}
        Ecco i verdetti degli esperti::{' '}
      </div>
      <div>
        <p>
          Questa era una immagine vera di un vero esperimento del National
          Geographic
        </p>
        <a
          style={{ color: 'blue', fontWeight: 'bold' }}
          href="http://www.fubiz.net/2011/03/07/real-life-version-of-up/"
          target="_blank"
        >
          {' '}
          Link{' '}
        </a>
        <img
          src={
            'https://res.cloudinary.com/ingootag-com/image/upload/v1651856819/Courage/Fake%20or%20Fact/Fact%20Cases/nationalgeographicchannel1-550x763_kyqn29.jpg'
          }
          style={{
            width: '90%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      </div>
      <div>
        <p>
          Questa era un'immagine reale, si tratta di un telo con cui si è
          coperto temporaneamente un edificio da ristrutturare
        </p>
        <a
          href="https://www.insider.com/architecture-optical-illusions-buildings-2018-5#this-photo-of-a-warped-building-isnt-photoshopped-at-all-1"
          style={{ color: 'blue', fontWeight: 'bold' }}
          target="_blank"
        >
          {' '}
          Link{' '}
        </a>
        <img
          src={
            'https://i.insider.com/5b0498fd5e48ec43008b4634?width=700&format=jpeg&auto=webp'
          }
          style={{
            width: '90%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      </div>
      <div>
        <p>
          Questa non era una foto reale, ma il volto del modello nella copertina
          della rivista è stata manipolata con Photoshop.{' '}
        </p>
        <a
          style={{ color: 'blue', fontWeight: 'bold' }}
          href="https://joshbenson.com/before-and-after-photoshopped-celebrity-pictures/"
          target="_blank"
        >
          Link
        </a>
        <img
          src={
            'https://www.joshbenson.com/wp-content/uploads/2013/07/faith-hill-ps.jpg'
          }
          style={{
            width: '90%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      </div>
      <div>
        <p>Non c'è marijuana nella foto reale, ma sono uova di Pasqua.</p>
        <a
          style={{ color: 'blue', fontWeight: 'bold' }}
          target="_blank"
          href="https://canadiangeographic.ca/articles/ten-reasons-why-we-love-chris-hadfield/"
        >
          Link
        </a>
        <img
          src={
            'https://cdn.mos.cms.futurecdn.net/79dV2feTGCwFf3bssWZxmD-970-80.jpg'
          }
          style={{
            width: '90%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      </div>
      <div>
        <p>
          In realtà non si incontrano mai e l'immagine è falsa qui puoi guardare
          l'immagine reale di Wayne Gabriel sul lato destro. Questo dimostra che
          anche un'immagine sbagliata può dire più di mille parole
        </p>
        <a
          style={{ color: 'blue', fontWeight: 'bold' }}
          target="_blank"
          href="https://www.snopes.com/fact-check/lennon-che-guitar/"
        >
          Link
        </a>
        <img
          src={
            'https://res.cloudinary.com/ingootag-com/image/upload/v1651856819/Courage/Fake%20or%20Fact/Fact%20Cases/Che_lenon_usi7iu.png'
          }
          style={{
            width: '98%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      </div>
    </div>
  );
}

const ExpertBadgesHandler = (props) => {
  /**  console.log("props", props); */
  const [component, setComponent] = React.useState(null);
  const fetchData = async () => {
    try {
      setComponent(<ExpertBadges />);
      props.triggerNextStep({
        trigger: 'ifUserLearnedSth',
      });
    } catch (err) {
      // setChatState('Response is not unavailable :-( catch Error');
      console.log(JSON.stringify(err));
      props.triggerNextStep({ trigger: 'ifUserLearnedSth' });
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{component}</>;
};
