import getExperienceCountAPICaller from "./getExperienceCountAPICaller";

export const stepExtractor = (currentConversation, nextStep) => {
  if (nextStep === "AskToClassify") {
    getExperienceCountAPICaller();
  }
  const currentChatKey = Object.keys(currentConversation)[
    Object.keys(currentConversation).length - 1
  ];
  const currentChat = {
    ...currentConversation[currentChatKey],
    message: currentConversation[currentChatKey].message
      ? currentConversation[currentChatKey].message
      : `I am message number ${currentChatKey}`,
    trigger: nextStep,
    value: currentConversation[currentChatKey].value
      ? currentConversation[currentChatKey].value
      : null,
    id: currentChatKey,
    //logTime: Date.now(),
  };
  return currentChat;
};
