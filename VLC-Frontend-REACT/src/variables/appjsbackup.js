/*global chrome*/
import React from 'react';
import { ActionButton } from './Components';
//import { Analysis, Recommended, Companion } from "./container"; //Analysis, Companion,
import { Companion, Recommended, Analysis } from './container'; //Analysis, Companion,
//import { ANALYSIS, COMPANION, RECOMMENDED } from "./common/constant"; image_meta_information

import { COMPANION, RECOMMENDED, ANALYSIS } from './common/constant';
import CompanionPicture from './introCompanion.png';
import companionContext from './context';
import { userTokenPrefix } from './variables/extension.js';
import checkUserNow from './utils/checkUser.js';

const ActionObject = [
  { id: ANALYSIS, text: 'Analysis and opinions' },
  { id: COMPANION, text: 'Companion' },
  { id: RECOMMENDED, text: 'Recommended' },
];

// const ActionBox = (setSelectedView) => {
//     const jsxObject = ActionObject.map(action => <ActionButton
//         key={action.id}
//         buttonText={action.text}
//         onClick={() => setSelectedView(action.id)}
//     />);
//     return jsxObject
// };

const ActionBox = (props) => {
  // props yek obj ast
  return (
    <React.Fragment>
      {ActionObject.map((action) => (
        <ActionButton
          key={action.id}
          buttonText={action.text}
          onClick={() => props.golabi(action.id)} // be jaye props.golabi mizari setSelected view
        />
      ))}
    </React.Fragment>
  );
};

const setView = (selectedView) => {
  switch (selectedView) {
    case RECOMMENDED:
      return <Recommended />;
    case COMPANION:
      return <CompanionCour />;
    case ANALYSIS:
      return <Analysis />;
    default:
      return null;
  }
};
//mailto:usr838fh3@COURAGE.eu"
const App = () => {
  localStorage.setItem('isCompanionUserTokenExist', Boolean('false'));
  localStorage.setItem('companionUserToken', '');
  const [imageMetaInfo, setImageMetaInfo] = React.useState({});
  const [selectedView, setSelectedView] = React.useState(COMPANION);
  var tempToken = '';
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    let separatedUrl = url.split('/');
    let lastPart = separatedUrl[separatedUrl.length - 1];
    if (lastPart.includes(userTokenPrefix)) {
      tempToken = lastPart.split(':')[1];
      localStorage.setItem('companionUserToken', tempToken);

      if (checkUserNow(tempToken)) {
        localStorage.setItem('isCompanionUserTokenExist', Boolean('true'));
        // console.log("==============", tempToken);
      }
    }
  });
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // did mount
      window.addEventListener('storage', () => {
        const result = JSON.parse(localStorage.getItem('companion_data'));
        return readImageMetaInfo(result);
      });
    }
    return () => {
      if (typeof window !== 'undefined') {
        // will unmount
        window.removeEventListener(
          'storage',
          () =>
            readImageMetaInfo(
              JSON.parse(localStorage.getItem('companion_data'))
            ) // chera ?
        );
      }
    };
  }, []);
  const readImageMetaInfo = (data) => {
    try {
      if (data && data.image_info && data.image_info.success) {
        // if all true then
        setImageMetaInfo(data.image_info.resp);
        //console.log(localStorage.getItem("image"));
      }
    } catch (error) {
      console.log('error while parsing image meta information', error);
    }
  };
  return Boolean(localStorage.getItem('isCompanionUserTokenExist')) ? (
    <companionContext.Provider
      value={{
        receivedImageInfo: imageMetaInfo,
        //UserToken: localStorage.getItem("companionUserToken")
        // UserToken: userToken,
      }}
    >
      <div style={{ width: '100%', backgroundColor: '#abaab3', margin: 0 }}>
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
                width: '150px',
                height: '150px',
                border: '5px solid #fff',
                margin: '5px',
              }}
              alt={'target'}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
              }}
            >
              <ActionBox golabi={setSelectedView} />
            </div>
            {setView(selectedView)}
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
      {/* <div>{checkUserNow}</div> */}
      {/* <div> userToken : {localStorage.getItem("companionUserToken")} </div> */}
    </companionContext.Provider>
  ) : (
    <div> Nicht! </div>
  );
};

export default App;
