import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import PropTypes from "prop-types";

import serverSideAddresses from '../../utils/ServerSideAddress.js';
import { PopupModal } from '../../Components';
import companionContext from '../../context';
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Recommended = () => {
  const consumer = React.useContext(companionContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = React.useState(null);
  //const keyWord = ["Keyword1", "Keyword2", "Keyword3", "Keyword4"];
  const handlePopup = (image) => {
    setIsModalOpen(true);
    setSelectedUrl(image);
    console.log('handlePopup ==== //// =====');
    console.log(image);
    fetch(`${serverSideAddresses}/clicklogger/RIS-Link`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        RIS_url: image.ReverseImageURLFromGoogleRIS,
        userToken: localStorage.getItem('companionUserToken'),
        objectID: 'RIS-Links-in-RECOMMENDED-tab',
        verbID: 'RIS-Links-in-RECOMMENDED-tab-clicked',
      }),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function renderTitle() {
    return (
      <div
        style={{
          width: '90%',
          display: 'flex',
          fontWeight: 'bold',
          fontSize: 'large',
          flexDirection: 'column',
          marginTop: '3vh',
          padding: '8px',
          backgroundColor: '#f0ecf0',
          borderRadius: '5px',
        }}
      >
        {/* <div> Pages that include matching images: </div> */}
        <div>
          Pagine contenenti immagini simili: Reverse Image Search (RIV):
        </div>
        <div> Reverse Image Search (RIV):</div>
      </div>
    );
  }

  function renderAggregateKeyword(keyWord) {
    return (
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '33px',
          padding: '8px',
          backgroundColor: '#f0ecf0',
          borderRadius: '5px',
        }}
      >
        <div>
          <Typography lenient="caption" display="block" gutterBottom>
            <div style={{ fontWeight: '1000', fontSize: 'medium' }}>
              Parole chiave da altre fonti:
            </div>
          </Typography>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '5px',
            marginBottom: '5px',
            padding: '0px',
          }}
        >
          {keyWord.map((word) => (
            <div
              style={{
                paddingLeft: isNaN(word) ? '10px' : '-10px',
                fontWeight: '900',
                fontSize: 'medium',
                fontWeight: 'bold',
                paddingTop: '14px',
              }}
            >
              {word}
              {isNaN(word) ? ':' : ' '}{' '}
            </div>
            // <Chip
            //   label={word}
            //   style={{
            //     marginLeft: "2px",
            //     marginRight: "2px",
            //   }}
            // />
          ))}
        </div>
      </div>
    );
  }
  const renderImageUrlMeta = (meta3) => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5px',
          flexWrap: 'wrap',
          marginBottom: '5px',
        }}
      >
        {meta3 &&
          meta3.image_meta_information &&
          meta3.image_meta_information.ReverseImagesMetadata &&
          meta3.image_meta_information.ReverseImagesMetadata.map((image) => {
            return image.ReverseImageURLFromGoogleRIS &&
              image.ReverseImageURLFromGoogleRIS.length > 0 ? (
              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Paper
                  elevation={3}
                  style={{
                    width: '80%',
                    // height: "100vh",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 15px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handlePopup(image)}
                  // className="start"
                >
                  <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                    <img
                      src={
                        consumer.receivedImageInfo.image_meta_information
                          .image_url
                      }
                      style={{
                        display: 'inline-block',
                        marginRight: '7vh',
                        marginTop: '13px',
                        width: '50px',
                        height: '50px',
                        border: '2px solid #808080',
                      }}
                      alt={'target'}
                    />
                    <p
                      style={{
                        fontWeight: '900',
                        fontSize: 'medium',
                        whitespace: 'pre-wrap',
                        display: 'inline-block',
                      }}
                    >
                      {image.NLPTitle} {'\n'}
                    </p>
                    {'\n'}
                    <p
                      style={{
                        fontWeight: '200',
                        whitespace: 'pre-wrap',
                        display: 'inline-block',
                      }}
                    >
                      {image.ReverseImageURLFromGoogleRIS}
                    </p>
                  </div>
                </Paper>
              </div>
            ) : null;
          })}
      </div>
    );
  };

  const getAggregateKeyword = (meta2) => {
    try {
      if (
        meta2.image_meta_information &&
        meta2.image_meta_information.KeywordsAggregated
      ) {
        let keyword = meta2.image_meta_information.KeywordsAggregated;
        let keywordArray = keyword.split(',');
        if (keywordArray.length >= 35) return keywordArray.slice(0, 35);
        else return keywordArray;
      }
      return [];
    } catch (error) {
      console.log('KeywordsAggregated is not exist !');
      return [];
    }
  };

  // const imageMetaInfo = consumer;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#343a40',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {renderAggregateKeyword(getAggregateKeyword(consumer.receivedImageInfo))}
      {renderTitle()}
      {renderImageUrlMeta(consumer.receivedImageInfo)}

      {isModalOpen && (
        <PopupModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          selectedUrl={selectedUrl}
        />
      )}
    </div>
  );
};

// Recommended.propTypes = {
//   /**
//    *  A prop which will store all image meta information that will be passed to Recommended screen
//    */
//   imageMetaInfo: PropTypes.object.isRequired,
// };

export default Recommended;
