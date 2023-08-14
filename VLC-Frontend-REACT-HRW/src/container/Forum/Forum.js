import React from "react";
import ForumComment from "./ForumComment.js";
import TextField from "@material-ui/core/TextField";

let comments = [
  {
    id: "1",
    userName: "Farbod",
    text:
      "Image has very low quality and the caption is written in very informal language",
    imgHash: "1h",
    userVotes: [
      {
        userName: "Sven",
        voteCount: 1,
      },
      {
        userName: "Nils",
        voteCount: -1,
      },
      {
        userName: "parmida",
        voteCount: 1,
      },
      {
        userName: "Daniel",
        voteCount: 1,
      },
    ],
  },
  {
    id: "2",
    userName: "Sven",
    text: "I think its a photoshoped image ",
    imgHash: "2h",
    userVotes: [
      {
        userName: "salman",
        voteCount: 1,
      },
      {
        userName: "gosfand",
        voteCount: 1,
      },
    ],
  },
  {
    id: "3",
    userName: "Nils",
    text:
      "there was link in the RIV images which mentioned the photo is manipulated",
    imgHash: "3h",
    userVotes: [
      {
        userName: "Ahmad",
        voteCount: 1,
      },
      {
        userName: "Farbod",
        voteCount: -1,
      },
    ],
  },
  {
    id: "4",
    userName: "Ahmad",
    text: "there was link in the RIV ",
    imgHash: "3h",
  },
];

export default function LitteForum() {
  const [data, setData] = React.useState([]);
  const userName = "Farbod";
  React.useEffect(() => {
    setData(comments);
  }, []);

  const handleAddVoteObject = (newVoteObjct, commentId) => {
    const targetComment = data.filter((item) => item.id === commentId)[0];
    targetComment.userVotes = targetComment.userVotes
      ? targetComment.userVotes
      : [];
    targetComment.userVotes = [...targetComment.userVotes, newVoteObjct];
    setData([...data.filter((item) => item.id !== commentId), targetComment]);
  };
  const handleRemoveVoteObject = (voteUserName, commentId) => {
    const targetComment = data.filter((item) => item.id === commentId)[0];
    targetComment.userVotes = targetComment.userVotes
      ? targetComment.userVotes
      : [];
    targetComment.userVotes = targetComment.userVotes.filter(
      (item) => item.userName !== voteUserName
    );
    setData([...data.filter((item) => item.id !== commentId), targetComment]);
    console.log("vote changed to 0");
  };

  const calculateVotes = (comment) => {
    const commentUserVotes = comment.userVotes ? comment.userVotes : [];
    const sumOfVotes = commentUserVotes.reduce(
      (acc, b) => acc + b.voteCount,
      0
    );
    return sumOfVotes;
  };
  return (
    <div>
      {data
        .sort((a, b) => calculateVotes(b) - calculateVotes(a))
        .map((comment) => (
          <ForumComment
            key={comment.id}
            addVoteObject={handleAddVoteObject}
            removeVoteObject={handleRemoveVoteObject}
            comment={comment}
            currentUserName={userName}
          />
        ))}
      <TextField
        style={{ margin: 20 }}
        id="standard-helperText"
        label="this post ?"
        defaultValue="I think"
        helperText="your oppinion"
      />
    </div>
  );
}
