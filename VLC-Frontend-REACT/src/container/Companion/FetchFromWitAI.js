import React from "react";
import { Loading } from "react-simple-chatbot";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

const FetchFromWitAI = (props) => {
  // console.log("props", props);
  const [chatState, setChatState] = React.useState(null);
  const [suggestedLinkState, setSuggestedLinkState] = React.useState(null);
  const fetchData = async () => {
    // let value = null;
    if (!chatState) {
      try {
        const response = await fetch(
          `http://localhost:3009/api/v1/witApi/${props.previousStep.value}`
        );
        if (response.status !== 200) {
          console.log("error 200");
          setChatState("Response unavailable :(");
        } else {
          const result = await response.json();
          console.log(result);
          if (typeof result !== "undefined") {
            if (result && result.intents[0]) {
              let answer = "";
              switch (result.intents[0].name) {
                case "greeting": {
                  let greetingResArr = [
                    "How are you my dear?",
                    "how do you do",
                    "is every thing ok?",
                  ];
                  const randomGreetingRes = Math.floor(
                    Math.random() * greetingResArr.length
                  );
                  setChatState(greetingResArr[randomGreetingRes]);
                  props.triggerNextStep({ trigger: "userInput" });
                  break;
                }
                case "fakenews": {
                  setChatState("thats fake!");
                  props.triggerNextStep({ trigger: "userInput" });
                  break;
                }
                case "User_ask_question_about_toxic_content_definition": {
                  setChatState(
                    "Fake news is false or misleading information presented as news. It often has the aim of damaging the reputation of a person or entity, or making money through advertising revenue"
                  );
                  setSuggestedLinkState(
                    "https://www.youtube.com/watch?v=FOZ0irgLwxU"
                  );
                  props.triggerNextStep({ trigger: "userInput" });
                  break;
                }
                case "Need_Help_Bullying": {
                  setChatState(
                    "1. Don’t delete anything try to do screenshot, 2. Report them and block the account. 3 Talk to law enforcement, if possible. 4. Don’t try to fight the bully. 5. Don’t believe the bully. 6. Talk to friends about it."
                  );
                  setSuggestedLinkState(
                    "https://www.youtube.com/watch?v=CFekuzaWcLI"
                  );
                  props.triggerNextStep({ trigger: "userInput" });
                  break;
                }
                case "The_Uesr_Answer_of_how_Are_You": {
                  answer =
                    "Great ! Do you have a question about toxic content definition, do you know diffrence between misinformation and disinformation 🤔?";
                  setChatState(answer);
                  props.triggerNextStep({ trigger: "Qtoxic" });
                  break;
                }
                default:
                  setChatState(
                    "Thats not In my RAM right now 😥😬😀! Lets start to play in environment, If you agree please choice one image and right click on it?"
                  );
                  props.triggerNextStep({ trigger: "userInput" });
              }
            } else {
              setChatState(
                "Thats not In my RAM right now 😥😬😀! Lets start to play in environment, If you agree please choice one image and right click on it"
              );
              props.triggerNextStep({ trigger: "YesManipulated1" });
              props.saveChatHistory(
                props.stepExtractor(props.steps, "YesManipulated1")
              );
            }
          } else {
            setChatState("undefined!!!!!");
            props.triggerNextStep({ trigger: "YesManipulated1" });
          }
        }
      } catch (err) {
        setChatState("Response is not unavailable :-( catch Error");
        console.log(JSON.stringify(err));
        props.triggerNextStep({ trigger: "YesManipulated1" });
      }
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {chatState ? chatState : <Loading />}
      {suggestedLinkState && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0px",
          }}
        >
          <ReactPlayer
            width={"160px"}
            playing={true}
            height={"160px"}
            url={suggestedLinkState}
            controls={true}
            light={true}
          />
        </div>
      )}
    </>
  );
};

FetchFromWitAI.propTypes = {
  triggerNextStep: PropTypes.func,
};

export default FetchFromWitAI;
