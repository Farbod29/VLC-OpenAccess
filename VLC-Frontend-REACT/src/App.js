/*global chrome*/
import React from 'react';

import { Analysis, Recommended, CompanionCour } from './container'; //Analysis, Companion,
//import { Recommended, Companion } from './container'; //Analysis, Companion,
//import { Companion, Recommended, Analysis } from "./container"; //Analysis, Companion,
import { ActionButton } from './Components';
import { ANALYSIS, COMPANION, RECOMMENDED } from './common/constant'; // ANALYSIS were removed
//import { COMPANION, RECOMMENDED } from './common/constant'; // ANALYSIS were removed
import CompanionPicture from './introCompanionIt.png';
import userNotExistEng from './UserLinkProblem.png';
import companionContext from './context';
import { userTokenPrefix } from './variables/extension.js';
import checkUserNow from './utils/checkUser.js';
import serverSideAddresses from './utils/ServerSideAddress.js';

const experienceIdExtractor = (Username) => {
  let fields = Username.split('@');
  let part1 = fields[1];
  let ExperimentID = part1.split('.').shift();
  return ExperimentID;
};

const getExperienceCountAPI2 = async (userToken, experienceId) => {
  try {
    console.log('call getcount from backend in APP.js');
    const res = await fetch(
      // fetch (url,{})
      `${serverSideAddresses}/experienceCounter/getcount`,
      {
        method: 'POST',
        body: JSON.stringify({
          userToken: userToken,
          experienceId: experienceId,
        }),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    // console.log(res);
    let result = await res.json();
    return result;
  } catch (error) {
    console.log('got problem in fetch API ');
  }
};

const getExperienceCountAPICallerInitial = async () => {
  const userToken = localStorage.getItem('companionUserToken');
  const experienceId = experienceIdExtractor(userToken);
  const countObject = await getExperienceCountAPI2(userToken, experienceId);
  localStorage.setItem('experienceCount', countObject.count);
  console.log('typeof experienceCount');
  console.log(typeof countObject.count);
  console.log(countObject.count);
  console.log('  localStorage.setItem, countObject.count);');
};

const ActionObject = [
  // { id: ANALYSIS, text: 'Analysis and opinions', properties: 'Analysis' },
  { id: COMPANION, text: 'Companion', properties: 'Companion' },
  { id: RECOMMENDED, text: 'Recommended', properties: 'Recommended' },
];

const ActionBox = (props) => {
  return (
    <React.Fragment>
      {ActionObject.map((action) => (
        <ActionButton
          key={action.id}
          buttonText={action.text}
          onClick={() => {
            props.setFrame(action.id);
            console.log(
              'button were clicked!!!' + action.text + action.properties
            );
            fetch(
              `${serverSideAddresses}/clicklogger/${action.properties}button`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  image_url: props.imageUrl,
                  userToken: localStorage.getItem('companionUserToken'),
                  objectID: `${action.properties}Button`,
                  verbID: `${action.properties}-clicked`,
                }),
              }
            )
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.log(error);
              });
          }} // be jaye props.set mizari setSelected view
        />
      ))}
    </React.Fragment>
  );
};

const callAPIbeforeRenderCompanion = () => {
  getExperienceCountAPICallerInitial();
  return <CompanionCour />;
};

const setView = (selectedView) => {
  if (selectedView === RECOMMENDED) {
    return <Recommended />;
  } else if (selectedView === COMPANION) {
    return callAPIbeforeRenderCompanion();
  } else if (selectedView === ANALYSIS) {
    return <Analysis />;
  }
  return null;
};
//mailto:usr838fh3@COURAGE.eu"
// sample => https://pfrias.couragecompanion.eu/mailto:usrT5SD5FG33@5OCT2021HRW.eu
const App = () => {
  console.log('Here is the appp !!!!');
  //localStorage.setItem("companion_data", null);
  var token = '';
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    let separatedUrl = url.split('/');
    let lastPart = separatedUrl[separatedUrl.length - 1];
    if (lastPart.includes(userTokenPrefix)) {
      token = lastPart.split(':')[1];
      console.log('what is the token ?');
      console.log(token);
      if (token) {
        localStorage.setItem('companionUserToken', token);
        const userToken = localStorage.getItem('companionUserToken');
        const userToken2 = localStorage.getItem('userToken2');
        if (
          userToken != userToken2 &&
          userToken != null &&
          userToken2 != null
        ) {
          console.log('userToken != userToken2');
          console.log('userToken1:');
          localStorage.removeItem('companion_data');
          localStorage.removeItem('experienceCount');
          localStorage.removeItem('x1');
          console.log(userToken);
          console.log('userToken2:');
          console.log(userToken2);
        }
        localStorage.setItem('userToken2', userToken);
        // console.log("==============", token);
      }
    }
  });

  const [imageMetaInfo, setImageMetaInfo] = React.useState({});
  const [imageUrl, setImageUrl] = React.useState('');
  const [selectedView, setSelectedView] = React.useState(COMPANION);
  const [isUserExist, setIsUserExist] = React.useState(false);
  //  window.location.pathname != "/index.html"
  !isUserExist && // return the first falsy !
    checkUserNow(localStorage.getItem('companionUserToken'), setIsUserExist);

  let handleStorageEvent = (e) => {
    console.log(e);
    //if (e.key == "companion_data") {
    const result = JSON.parse(localStorage.getItem('companion_data'));
    console.log('result', result);
    setImageUrl(result.image_info.resp.image_meta_information.image_url);
    return readImageMetaInfo(result);
    //}
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // did mount
      window.addEventListener('storage', handleStorageEvent);
    }
    return () => {
      if (typeof window !== 'undefined') {
        // will unmount
        window.removeEventListener('storage', handleStorageEvent);
      }
    };
  }, []);
  const readImageMetaInfo = (data) => {
    try {
      if (data && data.image_info && data.image_info.success) {
        // if all true then
        setImageMetaInfo(data.image_info.resp);
        //console.log("data.image_info.resp =======================");
        //console.log(localStorage.getItem("image"));
      }
    } catch (error) {
      console.log('error while parsing image meta information', error);
    }
  };

  return !isUserExist ? (
    <div>
      <img
        src={userNotExistEng}
        style={{
          width: '44%',
          height: '287px',
        }}
        alt={'Companion-Courage-UserLink-Has-Problem'}
      />
    </div>
  ) : (
    <companionContext.Provider
      value={{
        receivedImageInfo: imageMetaInfo,
        // UserToken: localStorage.getItem("companionUserToken")
        UserToken: token,
      }}
    >
      <div style={{ width: '100%', backgroundColor: '#d3d3d3', margin: 0 }}>
        {imageMetaInfo && imageMetaInfo.image_meta_information ? (
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={imageMetaInfo.image_meta_information.image_url}
              style={{
                width: '30%',
                height: 'auto',
                border: '5px solid #fff',
                margin: '5px',
              }}
              alt={'target'}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0 10px',
              }}
            >
              <ActionBox setFrame={setSelectedView} imageUrl={imageUrl} />{' '}
            </div>
            {setView(selectedView, imageUrl)}
          </div>
        ) : (
          <img
            src={CompanionPicture}
            style={{
              width: '630px',
              height: '730px',
            }}
            alt={'Companion-Courage'}
          />
        )}
      </div>
      {/* <div> userToken : {localStorage.getItem("companionUserToken")} </div> */}
    </companionContext.Provider>
  );
};

export default App;
