import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import Backdrop from "@material-ui/core/Backdrop";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import serverSideAddresses from '../utils/ServerSideAddress';
import { ReactTinyLink } from 'react-tiny-link';
import BoldSentenceMaker from './BoldSentenceMaker/BoldSentenceMaker';
import './index.css';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      justifySelf: 'center',
      width: '85%',
      marginLeft: '50px',
      marginTop: '40px',
      backgroundColor: 'white',
      margin: 0,
      padding: 0,
    },
    aTag: {
      fontWeight: 'bold',
      fontSize: 'large',
      marginTop: '40px',
      marginBottom: '40px',
      padding: theme.spacing(1, 3, 1),
      '&:hover': {
        background: '#f00',
        border: '2px solid black',
        backgroundColor: 'gray',
        color: '#ffffff',
      },
    },
    paper: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper, // ????
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: 0,
      justifyContent: 'flex-start',
      overflow: 'scroll',
      padding: theme.spacing(1, 3, 1),
    },
    button: {
      borderRadius: '50%',
      padding: '0.5em',
      width: ' 30px',
      height: '30px',
      border: '2px solid black',
      color: 'black',
      position: 'relative',
      '&:hover': {
        background: '#f00',
        border: '2px solid black',
        backgroundColor: 'gray',
        color: '#ffffff',
      },
      '&:after': {
        background: '#f00',
        border: '2px solid black',
        backgroundColor: 'red',
        color: '#ffffff',
      },
    },
    // button1::after {
    //   content: ' ',
    //   position: absolute,
    //   display: block,
    //   background-color: black,
    //   height: 2px,
    //   top: 12px,
    //   left: 5px,
    //   right: 5px,
    //   transform: rotate(45deg),
    // }
  })
);

export default function TransitionsModal(props) {
  let handlePopup = (imageUrl) => {
    console.log('imageUrl ==============================');
    console.log(imageUrl);
    fetch(`${serverSideAddresses}/clicklogger/RIS-Link`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        RIS_url: imageUrl,
        userToken: localStorage.getItem('companionUserToken'),
        objectID: 'RIS-Specific-News',
        verbID: 'RIS-Specific-News-clicked',
      }),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    window.open(imageUrl, '_blank');
  };
  const classes = useStyles();
  const { open, handleClose } = props;
  console.log('props are', props);

  const getKeywords = (imageMetaInfo) => {
    try {
      if (imageMetaInfo.SortedKeywords) {
        let keyword = imageMetaInfo.SortedKeywords;
        //let JudgmentCount = imageMetaInfo.JudgmentLiteratureVector;
        if (typeof keyword === 'string') {
          let keywordArray = keyword.trim().split(',');
          if (keywordArray.length >= 22) return keywordArray.slice(0, 22);
          else return keywordArray;
          // do stuff with arr
        } else {
          console.log('str is not a string');
        }
        // let keywordArray = keyword.trim().split(',');
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => handleClose()}
      closeAfterTransition
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div
            style={{
              height: '150px',
              width: '100%',
              marginTop: '15px',
            }}
          >
            <div className={classes.button1}>
              <button onClick={() => handleClose()}> X </button>
              <div />
            </div>
            <div
              style={{
                width: '90%',
                display: 'flex',
                fontWeight: 'bold',
                fontSize: 'x-large',
                flexDirection: 'column',
                marginTop: '4vh',
                marginDown: 'auto',
                marginLeft: '0vh',
                padding: '2vh',
                backgroundColor: '#f0ecf0',
                borderRadius: '5px',
              }}
            >
              {/* <div> Page that include matched image , Click to view!</div> */}
              <div Style={{ marginBottom: '25px' }}>
                Clicca sulla pagina che contiene un'immagine adatta per
                visualizzarla!
              </div>
            </div>
            <a
              className={classes.aTag}
              href={props.selectedUrl.ReverseImageURLFromGoogleRIS}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.selectedUrl.ReverseImageURLFromGoogleRIS}
            </a>
            {/* <ReactTinyLink
              cardSize="small"
              color="blue"
              width={'100%'}
              showGraphic={false}
              maxLine={2}
              minLine={1}
              url={props.selectedUrl.ReverseImageURLFromGoogleRIS} //imageMetaInfo.image_meta_information.image_url //props.selectedUrl.ReverseImageURLFromGoogleRIS
              onClick={() => {
                console.log('props.selectedUrl.ReverseImageURLFromGoogleRIS');
                console.log(props.selectedUrl.ReverseImageURLFromGoogleRIS);
                handlePopup(props.selectedUrl.ReverseImageURLFromGoogleRIS);
              }}
            /> */}
          </div>
          <div
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '14vh',
              padding: '1vh',
              backgroundColor: '#d66c63',
              borderRadius: '5px',
            }}
          >
            <div>
              <Typography letiant="caption" display="block" gutterBottom>
                Parole chiave (Potrebbero aiutarti nella tua valutazione):
              </Typography>
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            >
              {getKeywords(props.selectedUrl).map((word) => (
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
              ))}
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '5px',
              padding: '8px',
              backgroundColor: '#8a9fe3',
              borderRadius: '5px',
            }}
          >
            <Typography letiant="caption" display="block" gutterBottom>
              {'Presenza di dizionari con termini falsi: '}
              {/* {'Fake dictionary words occurrence:'}  */}
              <span style={{ color: 'red' }}>
                {props.selectedUrl.FakeClaimVector}
              </span>
            </Typography>
            <Typography letiant="caption" display="block" gutterBottom>
              {'Credibilità Parole del dizionario Occorrenza '}
              <span style={{ color: '#7CFC00' }}>
                {props.selectedUrl.JudgmentLiteratureVector}
              </span>
            </Typography>
          </div>
          <div
            style={{
              width: '90%',
              display: 'flex',
              fontWeight: 'bold',
              fontSize: 'x-large',
              flexDirection: 'column',
              marginTop: '4vh',
              marginDown: 'auto',
              marginLeft: '0vh',
              padding: '8px',
              backgroundColor: '#f0ecf0',
              borderRadius: '5px',
            }}
          >
            <div> Frasi chiave dal sito Web di cui sopra: </div>
          </div>
          <div
            style={{
              // width: "100%",
              // display: "flex",
              // flexDirection: "column",
              // marginTop: "5px",
              // padding: "8px",
              backgroundColor: '#ffffff',
              // borderRadius: "5px",
            }}
          >
            {props.selectedUrl.FakeSegments ? (
              <BoldSentenceMaker
                ghasem={props.selectedUrl.FakeSegments}
                rang={'#cf1549'}
              />
            ) : (
              ' '
            )}
          </div>
          <div>
            {props.selectedUrl.JudgementSegments ? (
              <BoldSentenceMaker
                ghasem={props.selectedUrl.JudgementSegments}
                rang={'#528a1c'}
              />
            ) : (
              ' '
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
