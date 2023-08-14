// import RIVimage from './ImagesAndICONS/RIVimage.png';
// import Fact from './ImagesAndICONS/Fact.jpg';
// import Fake from './ImagesAndICONS/Fake.jpg';
// import GuideRecButton from './ImagesAndICONS/GuideRecButton.png';
// import GuideRecButton2 from './ImagesAndICONS/GuideRecButton2.png';
// import GuideRecButton3 from './ImagesAndICONS/GuideRecButton3.png';
// import saveChatHistory from './saveChatHistory.js';
// import { stepExtractor } from './stepExtractor.js';
// // #495057cc
// export const conversationSteps = [
//   oldConversation,
//   {
//     delay: 200,
//     id: 'ShowThumbnail',
//     component: (
//       <img
//         src={consumer.receivedImageInfo.image_meta_information.image_url}
//         style={{
//           width: '70%',
//           height: 'auto',
//           border: '6px solid #fff',
//           margin: '5px',
//         }}
//         alt={'target'}
//       />
//     ),
//     trigger: (info) => {
//       console.log('ShowThumbnail ============== info');
//       console.log(experienceCount);
//       if (experienceCount === 0) {
//         // local storage gives string
//         saveChatHistory(stepExtractor(info.steps, 'AskAboutGender'));
//         return 'AskAboutGender';
//       } else {
//         saveChatHistory(stepExtractor(info.steps, 'GetUserOpinion'));
//         return 'GetUserOpinion';
//       }
//     },
//   },
//   {
//     id: 'AskAboutGender',
//     delay: 2000,
//     message: `${Steps.AskAboutGender}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'GenderClassification'));
//       return 'GenderClassification';
//     },
//   },
//   {
//     id: 'GenderClassification',
//     options: [
//       {
//         value: 'Male',
//         label: `${Steps.Male}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAboutEducation',
//             '',
//             'GenderClassification',
//             'Male'
//           );
//           return 'AskAboutEducation';
//         },
//       },
//       {
//         value: 'Female',
//         label: `${Steps.Female}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAboutEducation',
//             '',
//             'GenderClassification',
//             'Female'
//           );
//           return 'AskAboutEducation';
//         },
//       },
//       {
//         value: 'Other',
//         label: `${Steps.Other}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAboutEducation',
//             '',
//             'GenderClassification',
//             'Other'
//           );
//           return 'AskAboutEducation';
//         },
//       },
//     ],
//   },
//   {
//     id: 'AskAboutEducation',
//     delay: 2000,
//     message: `${Steps.AskAboutEducation}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'EducationClassification'));
//       return 'EducationClassification';
//     },
//   },
//   {
//     id: 'EducationClassification',
//     options: [
//       {
//         value: 'Master’s degree or above',
//         label: `${Steps.MastersDegreeOrAbove}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAgeGroupe',
//             '',
//             'EducationClassification',
//             'MastersDegreeOrAbove'
//           );
//           return 'AskAgeGroupe';
//         },
//       },
//       {
//         value: 'Bachelor’s degree',
//         label: `${Steps.BachelorDegree}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAgeGroupe',
//             '',
//             'EducationClassification',
//             'Bachelor’s degree'
//           );
//           return 'AskAgeGroupe';
//         },
//       },
//       {
//         value: 'Others',
//         label: `${Steps.Others}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAgeGroupe',
//             '',
//             'EducationClassification',
//             'Others'
//           );
//           return 'AskAgeGroupe';
//         },
//       },
//       {
//         value: 'Highschool',
//         label: `${Steps.Highschool}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAgeGroupe',
//             '',
//             'EducationClassification',
//             'Highschool'
//           );
//           return 'AskAgeGroupe';
//         },
//       },
//       {
//         value: 'elementary school',
//         label: `${Steps.elementarySchool}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAgeGroupe',
//             '',
//             'EducationClassification',
//             'elementary school'
//           );
//           return 'AskAgeGroupe';
//         },
//       },
//       {
//         value: 'I prefer not to say',
//         label: `${Steps.PreferNotToSay}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'AskAgeGroupe',
//             '',
//             'EducationClassification',
//             'Other'
//           );
//           return 'AskAgeGroupe';
//         },
//       },
//     ],
//   },
//   {
//     id: 'AskAgeGroupe',
//     delay: 2000,
//     message: `${Steps.AskAgeGroupe}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'AgeGroupeClassification'));
//       return 'AgeGroupeClassification';
//     },
//   },
//   {
//     id: 'AgeGroupeClassification',
//     options: [
//       {
//         value: '12-17',
//         label: `${Steps.Age1}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'GetUserOpinion',
//             '',
//             'AgeGroupeClassification',
//             '12-17'
//           );
//           return 'GetUserOpinion';
//         },
//       },
//       {
//         value: '18-26',
//         label: `${Steps.Age2}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'GetUserOpinion',
//             '',
//             'AgeGroupeClassification',
//             '18-26'
//           );
//           return 'GetUserOpinion';
//         },
//       },
//       {
//         value: '26-35',
//         label: `${Steps.Age3}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'GetUserOpinion',
//             '',
//             'AgeGroupeClassification',
//             '26-35'
//           );
//           return 'GetUserOpinion';
//         },
//       },
//       {
//         value: '35-older',
//         label: `${Steps.Age4}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'GetUserOpinion',
//             '',
//             'AgeGroupeClassification',
//             '35-older'
//           );
//           return 'GetUserOpinion';
//         },
//       },
//     ],
//   },
//   {
//     id: 'GetUserOpinion',
//     delay: 2000,
//     message: `${Steps.GetUserOpinion}`, // must be added here
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'userInputTextIdea'));
//       return 'userInputTextIdea';
//     },
//   },
//   {
//     id: 'userInputTextIdea',
//     user: true,
//     validator: (value) => {
//       if (value.length < 40) {
//         return 'Please put the answer bit longer than 40 characters';
//       }
//       return true;
//     },
//     trigger: (info) => {
//       console.log(info);
//       saveChatHistory(stepExtractor(info.steps, 'AskToClassify'));
//       //return "YesManipulated1";
//       return 'AskToClassify';
//       // saveChatHistory(stepExtractor(info.steps, returnTriggerOption()));
//       // return returnTriggerOption();
//     },
//   },
//   {
//     id: 'AskToClassify',
//     delay: 2000,
//     message: `${Steps.AskToClassify}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'Classification'));
//       return 'Classification';
//     },
//   },
//   {
//     id: 'Classification',
//     options: [
//       {
//         value: 'Fake',
//         label: 'Fake',
//         trigger: (info) => {
//           triggerInfo(info, 'CheckTheRISLinks', 'Fake', 'Classification', '');
//           return 'CheckTheRISLinks';
//         },

//         /// For the second round it should jump this section to google
//       },
//       {
//         value: 'probably Fake',
//         label: `${Steps.probablyFake}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'CheckTheRISLinks',
//             'probably Fake',
//             'Classification',
//             ''
//           );
//           return 'CheckTheRISLinks';
//         },
//       },
//       {
//         value: 'Not Sure',
//         label: `${Steps.NotSure}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'CheckTheRISLinks',
//             'Not Sure',
//             'Classification',
//             ''
//           );
//           return 'CheckTheRISLinks';
//         },
//       },
//       {
//         value: 'Probably Real',
//         label: `${Steps.ProbablyReal}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'CheckTheRISLinks',
//             'Probably Real',
//             'Classification'
//           );
//           return 'CheckTheRISLinks';
//         },
//       },
//       {
//         value: 'Real',
//         label: `${Steps.Real}`,
//         trigger: (info) => {
//           triggerInfo(info, 'CheckTheRISLinks', 'Real', 'Classification', '');
//           return 'CheckTheRISLinks';
//         },
//       },
//     ],
//   },
//   {
//     // TODO: correct the font
//     id: 'CheckTheRISLinks',
//     delay: 5000,
//     message: `${Steps.CheckTheRISLinks}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'ShowUserGuide1'));
//       console.log(
//         'ShowUserGuide1 ================================================================='
//       );
//       return 'ShowUserGuide1';
//     },
//   },
//   {
//     id: 'ShowUserGuide1',
//     delay: 4000,
//     component: (
//       <img
//         src={GuideRecButton}
//         style={{
//           width: '80%',
//           height: 'auto',
//           border: '6px solid #fffff',
//           margin: '5px',
//         }}
//         alt={'target'}
//       />
//     ),
//     trigger: (info) => {
//       console.log('=============ShowUserGuide1');
//       let x1 = Date.now();
//       console.log(x1);
//       localStorage.setItem('x1', x1);
//       saveChatHistory(stepExtractor(info.steps, 'Ok'));
//       return 'Ok';
//     },
//   },
//   {
//     id: 'Ok',
//     options: [
//       {
//         delay: 10000,
//         value: 'Ok!',
//         label:
//           'then come back to companion I am waiting for you, click here then "Ok" \
//             ',
//         trigger: (info) => {
//           saveChatHistory(
//             stepExtractor(info.steps, 'AskIfTheUserCheckedRIVTab')
//           );
//           return 'AskIfTheUserCheckedRIVTab';
//         },
//       },
//     ],
//   },
//   {
//     id: 'AskIfTheUserCheckedRIVTab',
//     delay: 2000,
//     message: `${Steps.AskIfTheUserCheckedRIVTab}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'GuideRecButton2'));
//       return 'GuideRecButton2';
//     },
//   },
//   {
//     id: 'GuideRecButton2',
//     delay: 2000,
//     component: (
//       <img
//         src={GuideRecButton2}
//         style={{
//           width: '56%',
//           height: '190px',
//           border: '6px solid #fffff',
//           margin: '5px',
//         }}
//         alt={'target'}
//       />
//     ),
//     trigger: (info) => {
//       console.log('local storage x1');
//       console.log(localStorage.getItem('x1'));
//       let x2 = Date.now();
//       let biasStepTime = localStorage.getItem('x1');
//       console.log('x2');
//       console.log(x2);
//       let dif = x2 - biasStepTime;
//       console.log('dif');
//       console.log(dif / 1000);
//       if (dif < 20000) {
//         saveChatHistory(stepExtractor(info.steps, 'BiasUser'));
//         return 'BiasUser';
//       } else {
//         saveChatHistory(stepExtractor(info.steps, 'GuideRecButton3'));
//         return 'GuideRecButton3';
//       }
//     },
//   },
//   {
//     id: 'BiasUser',
//     delay: 4000,
//     message: `${Steps.BiasUser}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'OkAfterBias'));
//       return 'OkAfterBias';
//     },
//   },
//   {
//     id: 'OkAfterBias',
//     options: [
//       {
//         value: 'Ok I checked again!',
//         label: 'Ok I checked again!',
//         trigger: (info) => {
//           saveChatHistory(stepExtractor(info.steps, 'GuideRecButton3'));
//           return 'GuideRecButton3';
//         },
//       },
//     ],
//   },
//   {
//     id: 'GuideRecButton3',
//     delay: 4000,
//     component: (
//       <img
//         src={GuideRecButton3}
//         style={{
//           width: '190px',
//           height: '190px',
//           border: '6px solid #fffff',
//           margin: '5px',
//         }}
//         alt={'target'}
//       />
//     ),
//     trigger: (info) => {
//       saveChatHistory(
//         stepExtractor(info.steps, 'AskIfTheUserCheckedRIVTabOptions')
//       );
//       return 'AskIfTheUserCheckedRIVTabOptions';
//     },
//   },
//   {
//     id: 'AskIfTheUserCheckedRIVTabOptions',
//     options: [
//       {
//         value: `${Steps.YesCheckedRIS}`,
//         label: `${Steps.YesCheckedRIS}`,
//         trigger: (info) => {
//           // console
//           // console.log(experienceCount);
//           if (experienceCount === 1) {
//             saveChatHistory(
//               stepExtractor(info.steps, 'InformationAboutGoogleRIV')
//             );
//             return 'InformationAboutGoogleRIV';
//           } else {
//             saveChatHistory(
//               stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV')
//             );
//             return 'ChangedTheirIdeaAfterRIV';
//           }
//         },
//       },
//       {
//         value: `${Steps.NoCheckedRIS2}`,
//         label: `${Steps.NoCheckedRIS2}`,
//         trigger: (info) => {
//           saveChatHistory(
//             stepExtractor(info.steps, 'AskToCheckRIVKeywordsAndLinksSecondTime')
//           );
//           return 'AskToCheckRIVKeywordsAndLinksSecondTime';
//         },
//       },
//     ],
//   },
//   {
//     id: 'InformationAboutGoogleRIV',
//     message: `${Steps.InformationAboutGoogleRIV}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'GoogleRIVimageGuide'));
//       return 'GoogleRIVimageGuide';
//     },
//   },
//   {
//     delay: 10000,
//     id: 'GoogleRIVimageGuide',
//     component: (
//       <img
//         src={RIVimage}
//         style={{
//           width: '50%',
//           height: 'auto',
//           border: '8px solid #fff',
//           margin: '3px',
//         }}
//         alt={'target'}
//       />
//     ),
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV'));
//       return 'ChangedTheirIdeaAfterRIV';
//     },
//   },

//   {
//     id: 'AskToCheckRIVKeywordsAndLinksSecondTime',
//     delay: 3000,
//     message: `${Steps.AskToCheckRIVKeywordsAndLinks}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaAfterRIV'));
//       return 'ChangedTheirIdeaAfterRIV';
//     },
//   },
//   {
//     delay: 4000,
//     id: 'ChangedTheirIdeaAfterRIV',
//     message: `${Steps.ChangedTheirIdeaAfterRIV}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'ChangedTheirIdeaOptions'));
//       return 'ChangedTheirIdeaOptions';
//     },
//   },
//   {
//     id: 'ChangedTheirIdeaOptions',
//     options: [
//       {
//         value: `${Steps.YesChangedTheirIdeaOptions}`,
//         label: `${Steps.YesChangedTheirIdeaOptions}`,
//         trigger: (info) => {
//           saveChatHistory(
//             stepExtractor(info.steps, 'ClassificationForSecondTime')
//           );
//           return 'ClassificationForSecondTime';
//         },
//       },
//       {
//         value: `${Steps.NoChangedTheirIdeaOptions}`,
//         label: `${Steps.NoChangedTheirIdeaOptions}`,
//         trigger: (info) => {
//           saveChatHistory(
//             stepExtractor(info.steps, 'FinishWithTheImageConversation')
//           );
//           return 'FinishWithTheImageConversation';
//         },
//       },
//     ],
//   },
//   {
//     id: 'ClassificationForSecondTime',
//     message: `${Steps.ClassificationForSecondTime}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'Classification2'));
//       return 'Classification2';
//     },
//   },
//   {
//     id: 'Classification2',
//     options: [
//       {
//         value: 'Fake',
//         label: 'Fake',
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'ReasonBehindChangingIdea',
//             'Fake',
//             'Classification2',
//             ''
//           );
//           return 'ReasonBehindChangingIdea';
//         },
//       },
//       {
//         value: 'probably Fake',
//         label: `${Steps.probablyFake2}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'ReasonBehindChangingIdea',
//             'probably Fake',
//             'Classification2',
//             ''
//           );
//           return 'ReasonBehindChangingIdea';
//         },
//       },
//       {
//         value: 'Not Sure',
//         label: `${Steps.NotSure2}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'ReasonBehindChangingIdea',
//             'Not Sure',
//             'Classification2',
//             ''
//           );
//           return 'ReasonBehindChangingIdea';
//         },
//       },
//       {
//         value: 'Probably Real',
//         label: `${Steps.ProbablyReal2}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'ReasonBehindChangingIdea',
//             'Probably Real',
//             'Classification2',
//             ''
//           );
//           return 'ReasonBehindChangingIdea';
//         },
//       },
//       {
//         value: 'Real',
//         label: `${Steps.Real2}`,
//         trigger: (info) => {
//           triggerInfo(
//             info,
//             'ReasonBehindChangingIdea',
//             'Real',
//             'Classification2',
//             ''
//           );
//           return 'ReasonBehindChangingIdea';
//         },
//       },
//     ],
//   },
//   {
//     id: 'ReasonBehindChangingIdea',
//     message: `${Steps.ReasonBehindChangingIdea}`,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'userInputTextIdea2'));
//       return 'userInputTextIdea2';
//     },
//   },
//   {
//     id: 'userInputTextIdea2',
//     user: true,
//     validator: (value) => {
//       if (value.length < 40) {
//         return 'value should bit longer than 40 characters';
//       }
//       return true;
//     },
//     trigger: (info) => {
//       saveChatHistory(
//         stepExtractor(info.steps, 'FinishWithTheImageConversation')
//       );
//       //return "YesManipulated1";
//       return 'FinishWithTheImageConversation';
//     },
//   },
//   {
//     id: 'FinishWithTheImageConversation',
//     message: 'Great Job!',
//     /// For
//     trigger: (info) => {
//       console.log('FinishWithTheImageConversation experienceCount === 2');
//       if (experienceCount > 3) {
//         console.log('LAAAAAST IFFFFF EXPERI ');
//         saveChatHistory(stepExtractor(info.steps, 'expertOpinion'));
//         return 'expertOpinion';
//       } else {
//         console.log('LAAAAAST IFFFFF EXPERI 22222 ');
//         sendExperienceCount();
//         saveChatHistory(stepExtractor(info.steps, 'beforeEnd'));
//         console.log(
//           'FinishWithTheImageConversation  ====== call send and get '
//         );
//         return 'beforeEnd';
//       }
//     },
//   },
//   {
//     id: 'expertOpinion',
//     message: Steps.expertOpinion,
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'showBadges'));
//       // saveChatHistory(stepExtractor(info.steps, "beforeEnd"));
//       //return "YesManipulated1";
//       return 'showBadges';
//     },
//   },
//   {
//     id: 'showBadges',
//     component: (
//       <img
//         src={
//           'https://pfrias.couragecompanion.eu/storage/m/_v2/213604778138275840/4f8b684e5-e9314a/9sZA64wS9VvG/fwgdPNihxgPvF2rcvG1sGmRCHKZmkWnNfuzOfDQD.png'
//         }
//         style={{
//           width: '50%',
//           height: 'auto',
//           border: '6px solid #fff',
//           margin: '5px',
//         }}
//         alt={'target'}
//       />
//     ),
//   },
//   {
//     id: 'showBadges',
//     component: (
//       <img
//         src={Controversial}
//         style={{
//           width: '50%',
//           height: 'auto',
//           border: '6px solid #fff',
//           margin: '5px',
//         }}
//         alt={'target'}
//       />
//     ),
//   },
//   {
//     id: 'beforeEnd',
//     message: () => {
//       if (experienceCount === 0) {
//         return `${Steps.FinishWithTheImageConversation} remain picture: 2`;
//       } else if (experienceCount < 3) {
//         return `${Steps.FinishWithTheImageConversation} remain picture: ${
//           2 - experienceCount
//         }`;
//       } else {
//         return `${Steps.FinishWithTheImageConversation} remain picture: 0`;
//       }
//     },
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, 'end words'));
//       return 'end words';
//     },
//   },
//   {
//     delay: 2000,
//     id: 'end words',
//     message: ' ',
//     end: true,
//   },
// ];
