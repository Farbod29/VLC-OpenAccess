// {
//     id: "ActivateRecommendedTab",
//     message:
//       "Please open the Recommended tab and check some retrieve images from the external other resources and click on them",
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, "KeywordsChecked"));
//       return "KeywordsChecked";
//     },
//   },
//   {
//     id: "KeywordsChecked",
//     options: [
//       {
//         value:
//           "Yes, I checked the recommended links and their important keywords and metadata",
//         label:
//           "Yes, I checked the recommended links and their important keywords and metadata",
//         trigger: (info) => {
//           saveChatHistory(stepExtractor(info.steps, "ChangeMind1"));
//           return "ChangeMind1";
//         },
//       },
//     ],
//   },
//   {
//     id: "ChangeMind1",
//     message: "Do you want to change your mind about your rate?",
//     trigger: (info) => {
//       saveChatHistory(stepExtractor(info.steps, "YesModified"));
//       return "EndOfOneLoop";
//     },
//   },
//   // {
//   //   id: "YesModified",
//   //   options: [
//   //     {
//   //       value: "Yes I think the image is Photoshoped (Manipulated)",
//   //       label: "Yes I think the image is Photoshoped (Manipulated)",
//   //       trigger: "OpenAnalysisForm",
//   //     },
//   //     {
//   //       value:
//   //         "Yes I think the image caption is Fake or from an invalid resource",
//   //       label:
//   //         "Yes I think the image caption is Fake or from an invalid resource, but the image took from other resources",
//   //       trigger: "OpenAnalysisForm",
//   //     },
//   //     {
//   //       value: "No, it's real and fact",
//   //       label: "No, it's real and fact",
//   //       trigger: "OpenAnalysisForm",
//   //     },
//   //     {
//   //       value: "I can't judge",
//   //       label: "I can't judge",
//   //       trigger: "OpenAnalysisForm",
//   //     },
//   //   ],
//   // },
//   // {
//   //   id: "OpenAnalysisForm",
//   //   message:
//   //     "Please open the analysis/Forum tab try to read or vote the comments and play around with diagram ",
//   //   trigger: "ChangeMind2",
//   // },
//   // {
//   //   id: "ChangeMind2",
//   //   message: "Do you want to change your mind about your rate?",
//   //   trigger: "YesItsModified",
//   // },
//   // {
//   //   id: "YesItsModified",
//   //   options: [
//   //     {
//   //       value: "Yes I think the image is photoshoped",
//   //       label: "Yes I think the image is photoshoped",
//   //       trigger: "EndOfOneLoop",
//   //     },
//   //     {
//   //       value:
//   //         "Yes I think the image caption is from an invalid resource, but the image took from  other resources",
//   //       label:
//   //         "Yes I think the image caption is from an invalid resource, but the image took from  other resources",
//   //       trigger: "EndOfOneLoop",
//   //     },
//   //     {
//   //       value: "No, its real",
//   //       label: "No, its real",
//   //       trigger: "EndOfOneLoop",
//   //     },
//   //     {
//   //       value: "I can't judge",
//   //       label: "I can't judge",
//   //       trigger: "EndOfOneLoop",
//   //     },
//   //   ],
//   // },
