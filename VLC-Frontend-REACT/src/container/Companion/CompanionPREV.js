import React from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
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

import Steps from './CompanionLanguages/Steps/EnSteps.js';
import RIVimage from './ImagesAndICONS/RIVimage.png';

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

const Companion = () => {
  getExperienceCountAPICaller();
  const consumer = React.useContext(companionContext);
  var experienceCount = Number(localStorage.getItem('experienceCount'));
  const [oldConversation, setOldConversation] = React.useState(null);
  const [chatbotMountStatus, setChatbotMountStatus] = React.useState(false);
  // const [experienceCount, setExperienceCount] = React.useState(() => {
  //   return experienceCount;
  // });
  const sendExperienceCount = async () => {
    const userToken = localStorage.getItem('companionUserToken');
    const experienceId = experienceIdExtractor(userToken);
    await sendExperienceCountAPI(userToken, experienceId);
    console.log('sendExperienceCountAPI activated count ++');
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
      delay: 200,
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
        if (experienceCount === 0) {
          // local storage gives string
          saveChatHistory(stepExtractor(info.steps, 'AskAboutGender'));
          return 'AskAboutGender';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'GetUserOpinion'));
          return 'GetUserOpinion';
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
          label: `${Steps.Other}`,
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
              'GetUserOpinion',
              '',
              'AgeGroupeClassification',
              '12-17'
            );
            return 'GetUserOpinion';
          },
        },
        {
          value: '18-26',
          label: `${Steps.Age2}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'GetUserOpinion',
              '',
              'AgeGroupeClassification',
              '18-26'
            );
            return 'GetUserOpinion';
          },
        },
        {
          value: '26-35',
          label: `${Steps.Age3}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'GetUserOpinion',
              '',
              'AgeGroupeClassification',
              '26-35'
            );
            return 'GetUserOpinion';
          },
        },
        {
          value: '35-older',
          label: `${Steps.Age4}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'GetUserOpinion',
              '',
              'AgeGroupeClassification',
              '35-older'
            );
            return 'GetUserOpinion';
          },
        },
      ],
    },
    // GetUserOpinion
    {
      id: 'GetUserOpinion',
      delay: 2000,
      message: `${Steps.GetUserOpinion}`, // must be added here
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'userInputTextIdea'));
        return 'userInputTextIdea';
      },
    },
    // "userInputTextIdea"
    {
      id: 'userInputTextIdea',
      user: true,
      validator: (value) => {
        if (value.length < 30) {
          return 'Please put the answer bit longer than 30 characters';
        }
        return true;
      },
      trigger: (info) => {
        console.log(info);
        saveChatHistory(stepExtractor(info.steps, 'AskToClassify'));
        return 'AskToClassify';
      },
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
          label: 'Fake',
          trigger: (info) => {
            triggerInfo(info, 'CheckTheRISLinks', 'Fake', 'Classification', '');
            return 'CheckTheRISLinks';
          },

          /// For the second round it should jump this section to google
        },
        {
          value: 'probably Fake',
          label: `${Steps.probablyFake}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'CheckTheRISLinks',
              'probably Fake',
              'Classification',
              ''
            );
            return 'CheckTheRISLinks';
          },
        },
        {
          value: 'Not Sure',
          label: `${Steps.NotSure}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'CheckTheRISLinks',
              'Not Sure',
              'Classification',
              ''
            );
            return 'CheckTheRISLinks';
          },
        },
        {
          value: 'Probably Real',
          label: `${Steps.ProbablyReal}`,
          trigger: (info) => {
            triggerInfo(
              info,
              'CheckTheRISLinks',
              'Probably Real',
              'Classification'
            );
            return 'CheckTheRISLinks';
          },
        },
        {
          value: 'Real',
          label: `${Steps.Real}`,
          trigger: (info) => {
            triggerInfo(info, 'CheckTheRISLinks', 'Real', 'Classification', '');
            return 'CheckTheRISLinks';
          },
        },
      ],
    },
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
      id: 'AskToComeBackAfterRIS',
      message:
        'When come back to companion tab I am waiting for you and click here on the "ok" button',
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
              saveChatHistory(
                stepExtractor(info.steps, 'InformationAboutGoogleRIV')
              );
              return 'InformationAboutGoogleRIV';
            } else if (experienceCount >= 2) {
              saveChatHistory(
                stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV')
              );
              return 'ChangedTheirIdeaAfterRIV';
            }
          },
        },
      ],
    },
    // AskIfTheUserCheckedRIVTab  // should be there for just a first loop!
    {
      id: 'AskIfTheUserCheckedRIVTab',
      delay: 2000,
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
      delay: 4000,
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
          label: 'Ok I checked again!',
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
            if (experienceCount === 1) {
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
      id: 'InformationAboutGoogleRIV',
      message: `${Steps.InformationAboutGoogleRIV}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'GoogleRIVimageGuide'));
        return 'GoogleRIVimageGuide';
      },
    },
    // GoogleRIVimageGuide
    {
      delay: 16000,
      id: 'GoogleRIVimageGuide',
      component: (
        <img
          src={RIVimage}
          style={{
            width: '50%',
            height: 'auto',
            border: '8px solid #fff',
            margin: '3px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV'));
        return 'ChangedTheirIdeaAfterRIV';
      },
    },
    // AskToCheckRIVKeywordsAndLinksSecondTime
    {
      id: 'AskToCheckRIVKeywordsAndLinksSecondTime',
      delay: 3000,
      message: `${Steps.AskToCheckRIVKeywordsAndLinks}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV'));
        return 'ChangedTheirIdeaAfterRIV';
      },
    },
    // ChangedTheirIdeaAfterRIV
    {
      delay: 4000,
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
          label: 'Fake',
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
          label: `${Steps.probablyFake2}`,
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
          label: `${Steps.NotSure2}`,
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
          label: `${Steps.ProbablyReal2}`,
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
          label: `${Steps.Real2}`,
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
        saveChatHistory(stepExtractor(info.steps, 'userInputTextIdea2'));
        return 'userInputTextIdea2';
      },
    },
    // userInputTextIdea2
    {
      id: 'userInputTextIdea2',
      user: true,
      validator: (value) => {
        if (value.length < 40) {
          return 'value should bit longer than 40 characters';
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
      message: 'Great Job!',
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
        if (experienceCountxxxx >= 2) {
          saveChatHistory(
            stepExtractor(info.steps, 'AskToCheckTheAnalysisTab')
          );
          return 'AskToCheckTheAnalysisTab';
        } else {
          saveChatHistory(stepExtractor(info.steps, 'beforeEnd'));
          console.log(
            'FinishWithTheImageConversation  ====== call send and get '
          );
          return 'beforeEnd';
        }
      },
    },
    // "ask to check the analysis tab for each picture"
    {
      delay: 2000,
      id: 'AskToCheckTheAnalysisTab',
      message: `${Steps.AskToCheckTheAnalysisTab}`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'GuideForTheAnalysisTab'));
        return 'GuideForTheAnalysisTab';
      },
    },
    // 'Guide For The Analysis Tab'
    {
      id: 'GuideForTheAnalysisTab',
      delay: 3000,
      component: (
        <img
          src={AnalysisTab}
          style={{
            width: '75%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '3px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        saveChatHistory(
          stepExtractor(info.steps, 'CommentAboutTheAnalysisTab')
        );
        return 'CommentAboutTheAnalysisTab';
      },
    },
    // 'Do you want to add any comment ? If you could change any of your previous vote which post was thant and what is your new vote then ?'
    {
      delay: 5000,
      id: 'CommentAboutTheAnalysisTab',
      message: `Do you want to add any comment ? If you could change any of your previous vote according to other's judgement in Analysis tab, which post do you want to change ? what is your new vote then ?`,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'userInputAfterAnalysis'));
        return 'userInputAfterAnalysis';
      },
    },
    // userInputAfterAnalysis
    {
      id: 'userInputAfterAnalysis',
      user: true,
      validator: (value) => {
        if (value.length < 10) {
          return 'Please put the answer bit longer than 40 characters';
        }
        return true;
      },
      trigger: (info) => {
        console.log(info);
        saveChatHistory(stepExtractor(info.steps, 'ifFinishedGoldenBadge'));
        return 'ifFinishedGoldenBadge';
      },
    },

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
        saveChatHistory(stepExtractor(info.steps, 'expertOpinion'));
        return 'expertOpinion';
      },
    },

    // expertOpinion (Last round)
    {
      id: 'expertOpinion',
      message: Steps.expertOpinion,
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'showImage1'));
        return 'showImage1';
      },
    },

    // showImage1
    {
      delay: 5000,
      id: 'showImage1',
      component: (
        <img
          src={
            'https://pfrias.couragecompanion.eu/storage/m/_v2/213604778138275840/4f8b684e5-e9314a/9sZA64wS9VvG/fwgdPNihxgPvF2rcvG1sGmRCHKZmkWnNfuzOfDQD.png'
          }
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
        saveChatHistory(stepExtractor(info.steps, 'showBadges1'));
        return 'showBadges1';
      },
    },

    //show showBadges1
    {
      delay: 3000,
      id: 'showBadges1',
      component: (
        <img
          src={Controversial}
          style={{
            width: '90%',
            height: 'auto',
            border: '3px solid #fff',
            margin: '2px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'showImage2'));
        return 'showImage2';
      },
    },
    // showImage2
    {
      delay: 3000,
      id: 'showImage2',
      component: (
        <img
          src={
            'https://pfrias.couragecompanion.eu/storage/m/_v2/213604778138275840/4f8b684e5-e9314a/vlyvkRQwb3ew/u8hVvH5l5IFvha9MQyXCzPOYLo2SXG3bqIpv6vBg.png'
          }
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
        saveChatHistory(stepExtractor(info.steps, 'showBadges2'));
        return 'showBadges2';
      },
    },
    //show showBadges2
    {
      delay: 3000,
      id: 'showBadges2',
      component: (
        <img
          src={Fake}
          style={{
            width: '30%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'showImage3'));
        return 'showImage3';
      },
    },
    // showImage3
    {
      delay: 3000,
      id: 'showImage3',
      component: (
        <img
          src={
            'https://pfrias.couragecompanion.eu/storage/m/_v2/213604778138275840/4f8b684e5-e9314a/Qig5WpTaUO3i/1NqeHx9E5Vz9p3jgrZy6GLl0WB5uHwHKQwRyZwFb.png'
          }
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
        saveChatHistory(stepExtractor(info.steps, 'showBadges3'));
        return 'showBadges3';
      },
    },
    //show showBadges3
    {
      id: 'showBadges3',
      delay: 3000,
      component: (
        <img
          src={Real}
          style={{
            width: '40%',
            height: 'auto',
            border: '6px solid #fff',
            margin: '5px',
          }}
          alt={'target'}
        />
      ),
      trigger: (info) => {
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
    // "userInputIfTheyKnowRISBefore"
    {
      id: 'userInputIfTheyKnowRISBefore',
      options: [
        {
          value: 'Yes',
          label: `Yes`,
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
          label: `No`,
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
        if (value.length < 30) {
          return 'Please put the answer bit longer than 30 characters';
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
          return `${Steps.FinishWithTheImageConversation} immagini rimanenti: 2`;
        } else if (experienceCount === 1) {
          return `${Steps.FinishWithTheImageConversation} immagini rimanenti: 1`;
        } else if (experienceCount >= 2) {
          return 'Nothing remain Chaoo my friend! Please deactivate me !!!';
        }
      },
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'end words'));
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

  return (
    <div style={{ width: '100%', backgroundColor: '#abaab3', height: 500 }}>
      {consumer.receivedImageInfo &&
        consumer.receivedImageInfo.image_meta_information &&
        (oldConversation && chatbotMountStatus ? (
          <ChatBot
            botAvatar={Emoji}
            steps={conversationSteps}
            headerTitle={'Companion BOT'}
            width={'inline-block'}
          />
        ) : (
          <Loading />
        ))}
    </div>
  );
};

export default Companion;
