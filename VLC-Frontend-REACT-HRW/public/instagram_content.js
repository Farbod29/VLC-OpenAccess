let clickedInstagramImage = null;

document.addEventListener(
  'mousedown',
  function (event) {
    // MouseEvent button Property
    // 0: Left mouse button
    // 1: Wheel button or middle button (if present)
    // 2: Right mouse button
    if (event.button == 2) {
      clickedInstagramImage =
        event.target.parentElement.childNodes[0].childNodes[0];
      // console.info(
      //   "The following Object was right clicked: " + clickedInstagramImage
      // );
    }
  },
  true
);

function sendImageURL(url) {
  chrome.runtime.sendMessage(
    {
      greeting: 'sendImageURL',
      url: url,
    }
    // function (response) {
    //   console.log(response);
    // }
  );
}

chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (clickedInstagramImage) {
    if (clickedInstagramImage.src) {
      url = clickedInstagramImage.src;
      if (request.request == 'image_url') {
        sendImageURL(url);
      }
    } else {
      console.error(
        'The right clicked element has no source (here: URL) attribute. Source attribute of the object: ' +
          clickedInstagramImage.src
      );
    }
  } else {
    console.error(
      'The right clicked element is not defined. Object: ' +
        clickedInstagramImage
    );
  }
  return;
});
