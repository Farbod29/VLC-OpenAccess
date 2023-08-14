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
          saveChatHistory(stepExtractor(info.steps, 'initialStep'));
          return 'initialStep';
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
    /// Test Steps
    {
      id: 'initialStep',
      message: 'initialStep',
      trigger: (info) => {
        getExperienceCountAPICaller();
        console.log('Test Step');
        console.log(experienceCount);
        if (experienceCount === 0) {
          // local storage gives string
          saveChatHistory(stepExtractor(info.steps, 'axe1'));
          return 'axe1';
        } else if (experienceCount === 1) {
          saveChatHistory(stepExtractor(info.steps, 'axe2'));
          return 'axe2';
        } else if (experienceCount === 2) {
          saveChatHistory(stepExtractor(info.steps, 'axe3'));
          return 'axe3';
        } else if (experienceCount >= 3) {
          saveChatHistory(stepExtractor(info.steps, 'b4end'));
          return 'b4end';
        }
      },
    },
    {
      delay: 200,
      id: 'axe1',
      message: 'Axe 1 Avalaiiiiii',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'b4end'));
        return 'b4end';
      },
    },
    {
      delay: 200,
      id: 'axe2',
      message: 'Axe dovom',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'b4end'));
        return 'b4end';
      },
    },
    {
      delay: 200,
      id: 'axe3',
      message: 'axe 3 vom',
      trigger: (info) => {
        saveChatHistory(stepExtractor(info.steps, 'b4end'));
        return 'b4end';
      },
    },
    {
      delay: 200,
      id: 'b4end',
      message: `b4end jadid: ${experienceCount}`,
      trigger: (info) => {
        sendExperienceCount();
        saveChatHistory(stepExtractor(info.steps, 'end'));
        return 'end';
      },
    },
    {
      id: 'end',
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
