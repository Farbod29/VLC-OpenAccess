/*
let contextMenuItem = {
  "id": "companion_pixelfed",
  "title": "Companion - Generiere Metadaten",
  "contexts": ["image"],
  // The context menu item should only be created on PixelFed
  documentUrlPatterns: [
    "http://pixelfed.de/!*",
    "http://www.pixelfed.de/!*",
    "https://pixelfed.de/!*",
    "https://www.pixelfed.de/!*",
    "http://pfrias.couragecompanion.eu/!*",
    "https://pfrias.couragecompanion.eu/!*"
  ]
};
let imageURL = "";
function getImageURL() {
  return imageURL;
}
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId == "companion_pixelfed2") {
    //alert("clicked");
    console.log("Following URL will be send to the Server: " + clickData.srcUrl);
    //Change the imageURL to call after window is created
    imageURL = clickData.srcUrl;
/!*    chrome.windows.create({
      url: "popup.html",
      type: "popup",
    });*!/
  }
});
*/
