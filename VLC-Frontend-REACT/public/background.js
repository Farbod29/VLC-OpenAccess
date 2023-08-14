// import env from './env';
//import serverAddress from './ServerAddress';
//console.log(serverAddress);
// chrome.management.get(chrome.runtime.id, function (extensionInfo) {
//   if (extensionInfo.installType === 'development') {
//   }
// });
//import queryString from 'query-string'; // import the queryString class
//courage function activity3
//const serverSideAddressesBackground = 'http://localhost:3005';
const serverSideAddressesBackground = 'https://companion.couragecompanion.eu';

const experienceIdExtractor = (Username) => {
  if (Username !== null) {
    let fields = Username.split('@');
    let part1 = fields[1];
    let ExperimentID = part1.split('.').shift();
    return ExperimentID;
  } else {
    console.log('user Is Null' + Username);
    return 'nullExperiment';
  }
};

console.log('here is background ');
let contextMenuItem = {
  id: 'companion_pixelfed',
  title: 'COURAGE-COMPANION',
  contexts: ['image'],
  // The context menu item should only be created on PixelFed
  documentUrlPatterns: [
    'http://pixelfed.de/*',
    'http://www.instagram.com/*',
    'http://www.pixelfed.de/*',
    'https://pixelfed.de/*',
    'https://www.pixelfed.de/*',
    'https://pixelfed.pa.itd.cnr.it/*',
    'http://pfrias.couragecompanion.eu/*',
    'https://pfrias.couragecompanion.eu/*',
    'https://swipeit.couragecompanion.eu/',
  ],
};

var currentURL;

chrome.tabs.query(
  { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {
    getCurrentURL(tabs[0].url);
    console.log('all tabs');
    console.log(tabs);
  }
);
chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log('url vase app Gonde');
    console.log(url);
  }
);

function getCurrentURL(tab) {
  currentURL = tab;
  console.log(currentURL);
}

chrome.tabs.query(
  { active: true, lastFocusedWindow: true, currentWindow: true },
  function (tabs) {
    var url = tabs[0].url;
    console.log(url);
  }
);

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, 'toggle');
});

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId === 'companion_pixelfed') {
    //alert("clicked");
    console.log(
      '!!!!! image clicked !!!!!! Following URL will be send to the Server: ' +
        clickData.srcUrl
    );

    //Change the imageURL to call after window is created
    imageURL = clickData.srcUrl;
    let userToken = localStorage.getItem('companionUserToken');

    let params = {
      //image_url: 'https://pfrias.couragecompanion.eu/storage/m/_v2/213604778138275840/ddefe3474-57d57c/6Y2CQ9Ou5xSL/7RdghF07u7OdtLS7cEknnNUJSFDz1vTuV8uhRLlX.png',
      userToken: userToken,
      image_url: imageURL,
      objectID: 'imageOnTheSocialPlatform',
      verbID: 'clicked',
      search_type: 'reverse_image_search',
    };
    //console.log("imageURL2 ==========================" + imageURL);

    function syntaxHighlight(json) {
      json = json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        }
      );
    }

    function AskforReverseImage(params) {
      return new Promise(function (resolve, reject) {
        /**
         * Very important point !!! add Http of Https if you want to talk with external server from Background!
         */
        fetch(`${serverSideAddressesBackground}/metadata/rev-search`, {
          // https://companion.couragecompanion.eu/metadata/rev-search/
          //fetch(`"https://companion.couragecompanion.eu"/metadata/rev-search`, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((result) =>
            result.json().then((res) => {
              console.log('response inside background API from backend: ');
              console.log(JSON.stringify(res, null, 2));

              localStorage.setItem(
                'companion_data',
                JSON.stringify({ image_parsed: true, image_info: res })
              );
              resolve(res);
            })
          )
          .catch((error) => {
            console.log('error: ' + JSON.stringify(error));
            reject(error);
          })
          .catch((error) => reject(error));
      });
    }
    AskforReverseImage(params);

    /*    chrome.windows.create({
              url: "popup.html",
              type: "popup",
            });*/
  }
});

// ----------------Extract the URLs, and count them----------------------------------------------------------------------------
console.log('url vase app kochoulo EMAM');

let count = 0;
let observedLinkArr = [];
let currentActiveTab = [];
let uniqueTabCount = 0;
let currentActiveTabCount = 0;
let newUniqueTabCount = 0;

let options_url = chrome.extension.getURL(''),
  // openOptionsPage,
  getOpenTabsCount,
  getStorage,
  updateBrowserActionBadge,
  handleBrowserActionBadgeEvents;

// --------------------------------------------------------------------------------------------------------
// Functions

// openOptionsPage = function (hash) {
//   chrome.tabs.query({ url: options_url }, function (tabs) {
//     if (tabs.length > 0) {
//       chrome.tabs.update(
//         tabs[0].id,
//         { active: true, highlighted: true, currentWindow: true },

//         function (current_tab) {
//           chrome.windows.update(current_tab.windowId, { focused: true });
//         }
//       );
//     } else {
//       window.addEventListener(hash, function () {
//         //url hash # has changed
//         console.log(' //url hash # has changed 3');
//       });
//       chrome.tabs.create({
//         url: hash !== undefined ? options_url + '#' + hash : options_url,
//       });
//     }
//   });
// };
getOpenTabsCount = function (callback) {
  currentActiveTab = [];
  chrome.tabs.query({ url: options_url }, function (tabs) {
    chrome.windows.getAll({ populate: true }, function (windows) {
      windows.forEach(function (window) {
        // console.log("window.tabs.favIconUrl");
        // console.log(window.tabs);
        window.tabs.forEach(function (tab) {
          currentActiveTab.push(tab.url);
          observedLinkArr.indexOf(tab.url) === -1 &&
          tab.url !== '' &&
          tab.url !== 'chrome://newtab/' && // ( x )? if x true: if x false&&
          tab.url !== '"chrome://newtab/"'
            ? observedLinkArr.push(tab.url)
            : console.log('This URL item already exists');
        });
      });
    });
    ////////////////////////////////
    chrome.windows.getAll({ populate: true }, function (windows) {
      let i = 0;
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          i++;
        });
      });
    });
    chrome.windows.getAll({ populate: true }, function (allWindows) {});
    count -= tabs.length;
    chrome.tabs.query({}, function (tabs) {
      count += tabs.length;

      callback(count);
    });
  });
};

getStorage = function (callback) {
  chrome.storage.local.get('open_tabs', function (items) {
    callback(items.open_tabs);
  });
};

updateBrowserActionBadge = function (open_tabs) {
  if (
    open_tabs === undefined ||
    open_tabs.settings.show_browser_action_count === true
  ) {
    getOpenTabsCount(function (count) {
      function locationHashChanged() {
        if (location.hash === '#cool-feature') {
          //console.log("You're visiting a cool feature! xxxx0000");
        }
      }

      newUniqueTabCount = observedLinkArr.length;

      ////////////////////////////////////////////////////API section////////////////////////////////////////////////
      if (newUniqueTabCount > uniqueTabCount) {
        console.log('new unique URL added !!!!!!!!!!!!!!!!');
        console.log(newUniqueTabCount);
        uniqueTabCount = newUniqueTabCount;
        console.log('observedLinkArr');
        console.log(observedLinkArr);
        console.log('currentActiveTab');
        console.log(currentActiveTab);
        currentActiveTabCount = currentActiveTab.length;
        console.log('currentActiveTab.length');
        console.log(currentActiveTabCount);
        const openTabsAndTheirCounts = async (
          uniqueTabCount,
          observedLinkArr,
          userToken,
          experienceId,
          currentActiveTab,
          currentActiveTabCount
        ) => {
          var experienceCount = Number(localStorage.getItem('experienceCount'));
          if (experienceCount < 5) {
            console.log(
              ` ${experienceCount} ,  experienceCount is less than 6 `
            );
            try {
              // let companionData = localStorage.getItem('companion_data');
              // console.log(
              //   'companionData.image_info.image_meta_information.image_url'
              // );
              // console.log(
              //   companionData.image_info.image_meta_information.image_url
              // );
              // console.log(companionData);

              const companion_data = JSON.parse(
                localStorage.getItem('companion_data')
              );
              let image_url =
                companion_data.image_info.resp.image_meta_information.image_url;
              console.log(
                'companion_data.image_info.resp.image_meta_information.image_url'
              );
              console.log(image_url);
              console.log('companion_data', companion_data);
              if (image_url === undefined || image_url === null) {
                image_url = '';
                console.log('image_url is null or undefined');
              }
              console.log('currentActiveTabCount2');
              console.log(currentActiveTabCount);
              const res = await fetch(
                // fetch (url,{})
                `${serverSideAddressesBackground}/opentabsandtheircounts`,
                //TODO: can usr names be upperCase
                {
                  method: 'POST',
                  body: JSON.stringify({
                    uniqueTabCount: uniqueTabCount,
                    observedLinkArr: observedLinkArr,
                    userToken: userToken,
                    image_url: image_url,
                    experienceId: experienceId,
                    currentActiveTab: currentActiveTab,
                    currentActiveTabCount: currentActiveTabCount,
                  }),
                  headers: {
                    'content-type': 'application/json',
                  },
                }
              );
              // console.log(res);
              let result = await res.json();
              //return result;
              console.log(result);
            } catch (error) {
              console.log('got problem in fetch API ');
            }
          } else {
            console.log(
              'We will not log the new OpenTab of the user after finishing the Experiment (All 3 images were surfed for current user) '
            );
          }
        };
        let InitialUserToken = localStorage.getItem('companionUserToken');
        var userToken = 'Null@User.com!';
        if (InitialUserToken == null) {
          console.log('Local storage is empty!!');
        } else {
          userToken = InitialUserToken;
        }
        let experienceId = experienceIdExtractor(userToken);
        // let userToken = "companionUserToken";
        // let experienceId = "exp";
        openTabsAndTheirCounts(
          uniqueTabCount,
          observedLinkArr,
          userToken,
          experienceId,
          currentActiveTab,
          currentActiveTabCount
        );
      }
    });
  } else {
    console.log(
      '!( open_tabs === undefined || open_tabs.settings.show_browser_action_count === true)'
    );
  }
};

handleBrowserActionBadgeEvents = function () {
  let tab_listener = function () {
    getStorage(function (open_tabs) {
      return updateBrowserActionBadge(open_tabs);
    });
  };

  getStorage(function (open_tabs) {
    if (
      open_tabs === undefined ||
      open_tabs.settings.show_browser_action_count === true
    ) {
      window.addEventListener('onhashchange', function () {
        //url hash # has changed
        console.log(' //url hash # has changed');
      });
      function locationHashChanged() {
        if (location.hash === '#cool-feature') {
          console.log("You're visiting a cool feature! xxxx");
        }
      }
      chrome.tabs.onActivated.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onAttached.addListener(tab_listener);
      chrome.tabs.onCreated.addListener(tab_listener);
      chrome.tabs.onDetached.addListener(tab_listener);
      chrome.tabs.onMoved.addListener(tab_listener);
      chrome.tabs.onHighlightChanged.addListener(tab_listener);
      chrome.tabs.onHighlighted.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onSelectionChanged.addListener(tab_listener);
      chrome.tabs.onUpdated.addListener(tab_listener);
      chrome.tabs.onReplaced.addListener(tab_listener);
      chrome.tabs.onZoomChange.addListener(tab_listener);
      chrome.tabs.onRemoved.addListener(tab_listener);
    } else {
      chrome.tabs.onActivated.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onAttached.addListener(tab_listener);
      chrome.tabs.onCreated.addListener(tab_listener);
      chrome.tabs.onDetached.addListener(tab_listener);
      chrome.tabs.onMoved.addListener(tab_listener);
      chrome.tabs.onHighlightChanged.addListener(tab_listener);
      chrome.tabs.onHighlighted.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onSelectionChanged.addListener(tab_listener);
      chrome.tabs.onUpdated.addListener(tab_listener);
      chrome.tabs.onReplaced.addListener(tab_listener);
      chrome.tabs.onZoomChange.addListener(tab_listener);
      chrome.tabs.onRemoved.addListener(tab_listener);
    }
    updateBrowserActionBadge(open_tabs);
  });
};

// --------------------------------------------------------------------------------------------------------
// Events

handleBrowserActionBadgeEvents();

chrome.runtime.onInstalled.addListener(function (details) {
  switch (details.reason) {
    case 'install':
      //openOptionsPage('install');
      break;
    case 'update':
      getStorage(function (open_tabs) {
        if (open_tabs === undefined || open_tabs.settings === undefined) {
          return;
        }
        if (
          open_tabs.settings !== undefined &&
          open_tabs.settings.enable_new_version_notification === true &&
          details.previousVersion !== chrome.runtime.getManifest().version
        ) {
          // openOptionsPage('update/' + chrome.runtime.getManifest().version);
          console.log('remove openOptionsPage');
        }
      });
      break;
  }
});

////////////////////////////////////////////////////////////////
