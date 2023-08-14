import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/Message';

const selectColorBasedOnVoteUp = (currentUserName, userVotes) => {
  const isAlreadyVoted = userVotes.some(
    (userVote) => userVote.userName === currentUserName
  );
  console.log(isAlreadyVoted);
  if (isAlreadyVoted) {
    if (
      userVotes.filter((userVote) => userVote.userName === currentUserName)[0]
        .voteCount === 1
    ) {
      return 'green';
    } else {
      return 'black';
    }
  } else {
    return 'black';
  }
};
const selectColorBasedOnVoteDown = (currentUserName, userVotes) => {
  const isAlreadyVoted = userVotes.some(
    (userVote) => userVote.userName === currentUserName
  );
  if (isAlreadyVoted) {
    if (
      userVotes.filter((userVote) => userVote.userName === currentUserName)[0]
        .voteCount === -1
    ) {
      return 'red';
    } else {
      return 'black';
    }
  } else {
    return 'black';
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
  control: {},

  voteSymbolsContainer: {
    color: '#000',
    backgroundColor: '#F3F5F7',
  },
  commentTextContainer: {
    color: '#000',
    backgroundColor: '#F3F5F7',
  },
  userNameContatiner: {
    fontWeight: 'bold',
  },
  textContatiner: {},
}));

export default function ForumComment(props) {
  const classes = useStyles();
  const { currentUserName, comment, addVoteObject, removeVoteObject } = props;
  const {
    id,
    vote,
    userName,
    text,
    userVotes = [
      {
        userName: '',
        voteCount: 0,
      },
    ],
  } = comment;

  const incrementVote = () => {
    if (currentUserName === userName) {
      console.log("you can't increment vote your comment");
    } else {
      const foundedVoteObject = userVotes.filter(
        (userVote) => userVote.userName === currentUserName
      );
      const commentVoteObject =
        foundedVoteObject.length > 0 ? foundedVoteObject[0] : {};
      if (commentVoteObject.voteCount === 1) {
        console.log('you alredey voted');
      } else if (commentVoteObject.voteCount === -1) {
        removeVoteObject(currentUserName, id);
      } else if (!commentVoteObject.voteCount) {
        const newVoteObjct = {
          userName: currentUserName,
          voteCount: 1,
        };
        addVoteObject(newVoteObjct, id);
      }
    }
  };
  const decrementVote = () => {
    if (currentUserName === userName) {
      console.log("you can't decrement vote your comment");
    } else {
      const foundedVoteObject = userVotes.filter(
        (userVote) => userVote.userName === currentUserName
      );
      const commentVoteObject =
        foundedVoteObject.length > 0 ? foundedVoteObject[0] : {};
      if (commentVoteObject.voteCount === 1) {
        removeVoteObject(currentUserName, id);
      } else if (commentVoteObject.voteCount === -1) {
        console.log('you already voted');
      } else if (!commentVoteObject.voteCount) {
        const newVoteObjct = {
          userName: currentUserName,
          voteCount: -1,
        };
        addVoteObject(newVoteObjct, id);
      }
    }
  };

  //   console.log( //acc + b.voteCount
  //     userVotes.reduce((acc, b) => acc + b.voteCount, 0) // return acc + b.voteCount
  //   );
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid
          item
          xs={2}
          // flexDirection={"column"}
          className={classes.voteSymbolsContainer}
        >
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            onClick={incrementVote}
          >
            <ExpandLessIcon
              style={{
                color: selectColorBasedOnVoteUp(currentUserName, userVotes),
              }}
            />
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            {userVotes.reduce((acc, b) => acc + b.voteCount, 0)}
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            onClick={decrementVote}
          >
            <ExpandMoreIcon
              style={{
                color: selectColorBasedOnVoteDown(currentUserName, userVotes),
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={10}
          direction="row"
          container
          justify="flex-start"
          alignItems="center"
          className={classes.commentTextContainer}
          style={{ position: 'relative' }}
        >
          <div style={{ position: 'absolute', bottom: 10, right: 20 }}>
            <span
              className={classes.userNameContatiner}
              style={{ margin: '0px 6px' }}
            >
              {userName}
            </span>
            <MessageIcon />
          </div>
          {/* <span>&nbsp;:&nbsp;</span> */}
          <span className={classes.userNameContatiner}>"</span>
          <span className={classes.textContatiner}>{text}</span>
          <span className={classes.userNameContatiner}>"</span>
        </Grid>
      </Grid>
    </div>
  );
}
