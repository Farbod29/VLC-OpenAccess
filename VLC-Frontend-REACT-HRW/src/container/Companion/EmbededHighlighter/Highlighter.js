import React, { useState, useEffect } from 'react';

import './highlight.css';
import serverSideAddress from '../../../utils/ServerSideAddress';
import HighlightedInput from './HighlightedInput';
import HighlightedBoxes from './HighlightedBoxes';
import experienceIDExtractor from '../experienceIdExtractor';

const Highlighter = (props) => {
  const [highlightedBoxList, setHighlightedBoxList] = useState([]);
  const [fertigStatus, setFertigStatus] = useState(false);
  // API for the Highlighter
  // send data to the backend via API:

  const setFinishForTheList = (e) => {
    e.preventDefault();
    setFertigStatus(!fertigStatus);
    fetch(`${serverSideAddress}/clicklogger/FinishHighlightButton`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: props.imageUrl,
        userToken: localStorage.getItem('companionUserToken'),
        objectID: `FinishHighlightButton`,
        verbID: `selected`,
      }),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddHighlightedAPIForLL = async (lastHighlightedText) => {
    console.log(' =========== lastHighlighted text !');
    console.log(lastHighlightedText);
    const userToken = localStorage.getItem('companionUserToken');
    // console.log('serverSideAddresses');
    // console.log(serverSideAddress);
    let experienceID = experienceIDExtractor(userToken);
    //console.log(experienceID);
    try {
      const response = await fetch(
        `${serverSideAddress}/AddHighlightedAPIForLL`,
        {
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            userToken: userToken,
            experienceID: experienceID,
            lastHighlightedText: lastHighlightedText,
            // vlcFrontTime: Date.now(),
          }),
        }
      );
      if (response.status === 500)
        console.log(
          'highlighted response error 500 from backend : ' +
            JSON.stringify(response.message)
        );
    } catch (e) {
      console.log(
        e +
          ': ' +
          JSON.stringify(e) +
          'error in highlighted boxes from backend for deleted text'
      );
    }
  };

  const DeletedHighlightedAPI = async (deletedObj) => {
    let deletedText = deletedObj.text;
    //console.log(deletedText);
    const userToken = localStorage.getItem('companionUserToken');
    // console.log('serverSideAddresses');
    // console.log(serverSideAddress);
    let experienceID = experienceIDExtractor(userToken);
    // console.log(experienceID);
    try {
      const response = await fetch(
        `${serverSideAddress}/DeletedHighlightedAPI`,
        {
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            userToken: userToken,
            experienceID: experienceID,
            deletedText: deletedText,
            // vlcFrontTime: Date.now(),
          }),
        }
      );
      if (response.status === 500)
        console.log(
          'highlighted response error 500 from backend : ' +
            JSON.stringify(response.message)
        );
    } catch (e) {
      console.log(
        e +
          ': ' +
          JSON.stringify(e) +
          'error in highlighted boxes from backend for deleted text'
      );
    }
  };
  const getTheTextBox = (HighlightedBox, id) => {
    // console.log('HighlightedBox');
    // console.log(HighlightedBox);
    // console.log('id');
    // console.log(id);
    DeletedHighlightedAPI(HighlightedBox.find((e) => e.id == id));
  };

  const sendHighlightedDataToBackend = async (highlightedBoxList) => {
    const userToken = localStorage.getItem('companionUserToken');
    // console.log('serverSideAddresses');
    // console.log(serverSideAddress);
    let experienceID = experienceIDExtractor(userToken);
    // console.log(experienceID);
    try {
      const response = await fetch(
        `${serverSideAddress}/HighlightedTextsArray`,
        {
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            userToken: userToken,
            experienceID: experienceID,
            highlightedBoxList: highlightedBoxList,
            // vlcFrontTime: Date.now(),
          }),
        }
      );
      if (response.status === 500)
        console.log(
          'highlighted response error 500 from backend : ' +
            JSON.stringify(response.message)
        );
    } catch (e) {
      console.log(
        e + ': ' + JSON.stringify(e) + 'error in highlighted boxes from backend'
      );
    }
  };

  // UseEffect

  useEffect(() => {
    sendHighlightedDataToBackend(highlightedBoxList);
  }, [highlightedBoxList]);

  const removeHighlightBoxFromTheList = (id) => {
    getTheTextBox([...highlightedBoxList], id);
    const removedArr = [...highlightedBoxList].filter(
      (highlightedBox) => highlightedBox.id !== id
    ); // Ouni ke oun shart ro dare mimoune !!
    setHighlightedBoxList(removedArr);
  };

  const addHighlightBoxToTheList = (highlightedBox) => {
    const newHighlightedBoxList = [highlightedBox, ...highlightedBoxList];
    console.log('highlightedBox');
    console.log(highlightedBox);
    AddHighlightedAPIForLL(highlightedBox.text);
    setHighlightedBoxList(newHighlightedBoxList);
    // console.log(highlightedBox, ...highlightedBoxList);
    // fetch
    /**include
     * 
     * UserLik: x@cg.eu
       group : cg
       PrevStepId
       timeStamp 
       newHighlightedBoxList // [{}{} ]
     * 
     * 
     */
  };

  return (
    <div>
      {!props.finishHighlightState ? (
        <div className="card">
          <HighlightedInput
            onSubmit={addHighlightBoxToTheList}
            fertigStatusChild={fertigStatus}
          />
          {/**include image text and the okey button  */}
          <HighlightedBoxes
            highlightedBoxListChild={highlightedBoxList}
            removeHighlightBoxFromTheListChild={removeHighlightBoxFromTheList}
            setFinishForTheListChild={setFinishForTheList}
            fertigStatusChild={fertigStatus}
          />
          <p>
            Falls du nichts gefunden hast oder du mit deiner Auswahl zufrieden
            bist, klicke bitte auf “Fertig” !
          </p>
          <button
            className="btn"
            onClick={setFinishForTheList}
            disabled={fertigStatus}
          >
            Fertig!
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Highlighter;
