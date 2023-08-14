title = chrome.i18n.getMessage("extName");

let contextMenuItem = {
  id: "companion_instagram",
  type: "normal",
  title: title,
  // Page needs to be selected, because no other selection can be used for the actual Instagram version
  // The only disadvantage compared to PixelFed is that the user can also select a non-image element using this extension. This is not available to fix due to the current architecture.
  // https://developer.chrome.com/extensions/contextMenus#type-ContextType

  // This will be fixed in instagram_content.js by checking the right clicked Element. If the element is undefnied the Server won't be called with a request.
  contexts: ["page"],
  onclick: function () {
    requestInstagramImageURL();
  },
  documentUrlPatterns: [
    "http://instagram.com/*",
    "https://pixelfed.pa.itd.cnr.it/*",
    "http://www.instagram.com/*",
    "https://instagram.com/*",
    "https://www.instagram.com/*",
  ], // show on all addresses
};

function requestInstagramImageURL() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        // Define here what we want to have
        request: "image_url",
      });
    }
  );
}

// Create context menu item
chrome.contextMenus.create(contextMenuItem);

// This method listen's for the response from instagram_content.js and then processes it.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "sendImageURL") {
    imageURL = request.url;
    // chrome.windows.create({
    //   url: "popup.html",
    //   type: "popup",
    // });
  }
});

let imageURL = "";

function getImageURL() {
  console.log(imageURL);
  return imageURL;
}
