export const saveChatHistory = (chatHistory) => {
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
            // console.log("successfully chat sent to backend" + msg);
          })
          .catch((err) => {
            'Could not add chat info to backend + '(err);
          });
      }
    })
    .catch((err) => console.log(err));
};
