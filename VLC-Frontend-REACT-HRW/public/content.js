let icon = document.getElementById('logo');
//icon.src = chrome.runtime.getURL("logo.png");

chrome.runtime.onMessage.addListener(function (msg, sender) {
  console.log('message is', msg);
  if (msg === 'toggle') {
    //console.log('in toggle');
    toggle();
  }
});
function toggle() {
  //console.log('iframe', iframe.style.width);
  if (iframe.style.width !== '0px') {
    iframe.style.width = '0px';
  } else {
    iframe.style.width = '36%';
  }
}
// chrome.tabs.onCreated.addListener(function (t) {
//   {
//     console.log("the tab of the open page");
//     console.log(t.status);
//     console.log(t);
//   }
// });
let currentUlr = window.location.toString();
// console.log('currentUlr');
// console.log(currentUlr);
let iframe = document.createElement('iframe');
if (currentUlr === 'https://rias-insta-simulate.vercel.app/') {
  iframe.style.width = '36%';
} else {
  iframe.style.width = '0px';
}
iframe.style.background = '#d3d3d3';
iframe.style.height = '100%';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.frameBorder = 'none';
//iframe.src = chrome.extension.getURL("popup.html");
iframe.src = chrome.extension.getURL('index.html');

document.body.appendChild(iframe);
