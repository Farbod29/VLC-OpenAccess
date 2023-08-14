import React from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import ReactPlayer from 'react-player';
import { ThemeProvider } from 'styled-components';
import Emoji from './BOT.png';
/**
https://www.npmjs.com/package/react-player
**/

const theme = {
  background: '#f5ffb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#5F2EFF',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#5F2EFF',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const AsyncChatBot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot
      botAvatar={Emoji}
      // customDelay={1000000000}
      // botDelay={1000000000}
      headerTitle="Courage ChatBot"
      steps={[
        {
          id: '1',
          message: () => {
            let startConversation = [
              'Hi 😀',
              'Hello, hear is companion 😀',
              'Hi, I am here to assist you 😀',
            ];
            const randomStartConversation = Math.floor(
              Math.random() * startConversation.length
            );
            return startConversation[randomStartConversation];
          },
          trigger: 'userInput',
        },
        {
          id: 'userInput',
          user: true,
          trigger: 3,
        },
        {
          id: '3',
          component: <FetchFromWitAI />,
          waitAction: true,
          asMessage: true,
        },
        {
          id: '4',
          message: 'how are you 4',
          trigger: 'userInput',
        },
        {
          id: '7',
          message: "I don't know!",
          trigger: 'userInput',
        },
        {
          id: '8',
          message: "I don't know!",
          trigger: 'userInput',
        },
        {
          id: 'Qtoxic',
          options: [
            { value: 1, label: 'Yes', trigger: 'userInput' },
            { value: 2, label: 'No', trigger: 'Misinformation' },
          ],
        },
        {
          id: 'Misinformation',
          message: () => {
            return 'Misinformation is “false information that is spread, regardless of intent to mislead.” Put a flag in the second half of this definition; it will be important later. The spread of misinformation happens often in our everyday lives. We human beings—news flash—are not perfect. We can all make mistakes. We all forget things. We mishear or misremember details. We tell our friends something we heard on TV or saw on social media that wasn’t really true. If you are spreading around information that is wrong but you don’t know it is wrong, then you are, well, technically, spreading misinformation.';
          },
          delay: 3000,
          trigger: () => {
            return 'Disinformation';
          },
        },
        {
          id: 'Disinformation',
          delay: 5000,
          message: () => {
            return 'Disinformation is knowingly spreading misinformation, its means “false information, as about a country’s military strength or plans, disseminated by a government or intelligence agency in a hostile act of tactical political subversion.” It is also used more generally to mean “deliberately misleading or biased information; manipulated narrative or facts; propaganda.” so image manipulation is subset of disinformation';
          },
          trigger: 'userInput',
        },
      ]}
    />
  </ThemeProvider>
);

const FetchFromWitAI = (props) => {
  /**  console.log("props", props); */

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
          console.log('error 200');
          setChatState('Response unavailable :(');
        } else {
          const result = await response.json();
          // console.log(result);
          if (typeof result !== 'undefined') {
            if (result && result.intents[0]) {
              let answer = '';
              switch (result.intents[0].name) {
                case 'greeting': {
                  let greetingResArr = [
                    'How are you my dear?',
                    'how do you do',
                    'is every thing ok?',
                  ];
                  const randomGreetingRes = Math.floor(
                    Math.random() * greetingResArr.length
                  );
                  setChatState(greetingResArr[randomGreetingRes]);
                  props.triggerNextStep({ trigger: 'userInput' });
                  break;
                }
                case 'fakenews': {
                  setChatState('thats fake!');
                  props.triggerNextStep({ trigger: 'userInput' });
                  break;
                }
                case 'User_ask_question_about_toxic_content_definition': {
                  setChatState(
                    'Fake news is false or misleading information presented as news. It often has the aim of damaging the reputation of a person or entity, or making money through advertising revenue'
                  );
                  setSuggestedLinkState(
                    'https://www.youtube.com/watch?v=FOZ0irgLwxU'
                  );
                  props.triggerNextStep({ trigger: 'userInput' });
                  break;
                }
                case 'Need_Help_Bullying': {
                  setChatState(
                    '1. Don’t delete anything try to do screenshot, 2. Report them and block the account. 3 Talk to law enforcement, if possible. 4. Don’t try to fight the bully. 5. Don’t believe the bully. 6. Talk to friends about it.'
                  );
                  setSuggestedLinkState(
                    'https://www.youtube.com/watch?v=CFekuzaWcLI'
                  );
                  props.triggerNextStep({ trigger: 'userInput' });
                  break;
                }
                case 'The_Uesr_Answer_of_how_Are_You': {
                  answer =
                    'Great ! Do you have a question about toxic content definition, do you know diffrence between misinformation and disinformation 🤔?';
                  setChatState(answer);
                  props.triggerNextStep({ trigger: 'Qtoxic' });
                  break;
                }
                default:
                  setChatState(
                    'Thats not In my RAM right now 😥😬😀! Lets start to play in environment, If you agree please choice one image and right click on it?'
                  );
                  props.triggerNextStep({ trigger: 'userInput' });
              }
            } else {
              setChatState(
                'Thats not In my RAM right now 😥😬😀! Lets start to play in environment, If you agree please choice one image and right click on it'
              );
              props.triggerNextStep({ trigger: 5 });
            }
          } else {
            setChatState('undefined!!!!!');
            props.triggerNextStep({ trigger: 'userInput' });
          }
        }
      } catch (err) {
        setChatState('Response is not unavailable :-( catch Error');
        console.log(JSON.stringify(err));
        props.triggerNextStep({ trigger: 'userInput' });
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
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0px',
          }}
        >
          <ReactPlayer
            width={'160px'}
            playing={true}
            height={'160px'}
            url={suggestedLinkState}
            controls={true}
            light={true}
          />
        </div>
      )}
    </>
  );
};

export default AsyncChatBot;
