import React, { useState, useEffect } from 'react';
import './highlight.css';
import littleZoo from '../ImagesAndICONS/ZooPosting.jpg';
import Swal from 'sweetalert2';
import Emoji from './logo.png'; //
//https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection
// https://medium.com/unprogrammer/a-simple-text-highlighting-component-with-react-e9f7a3c1791a

//thanks for the provider and @Saeed Rastgar my friend to assist the in the CSS part.

export default function TextHighlighter(props) {
  const [highlightedText, setHighlightedText] = useState(
    'Hervorgehobener Text wird hier angezeigt!'
  );
  useEffect(() => {
    // give permission to run this part on the client side
    //!
    const saveSelection = () => {
      setHighlightedText(window.getSelection().toString());
    };
    document.addEventListener('mouseup', saveSelection);
    return () => document.removeEventListener('mouseup', saveSelection);
  }, []);
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 0px',
        }}
      >
        <section className="card">
          <div>
            <img className="img-holder" src={littleZoo}></img>
            <div className="txt">
              LittleZoo Werbung: Unser neues Bastelset stellt eine schöne,
              ideale Welt dar! Kinder können wirklich alles, was es im Zoo zu
              sehen und zu erleben gibt, nachspielen. Mit ihnen können
              Rollenspiele geübt und Verhaltensweisen lebensecht nachgeahmt
              werden. Ohne Einschränkungen!
            </div>
            <div className="highlightedTxt">{highlightedText}</div>
            <div // parent of button
            >
              <button
                className="btn"
                onClick={() => {
                  Swal.fire({
                    title: 'Markierter Teil aufgenommen',
                    text: `Du hast erfolgreich  " ${highlightedText} " markiert und ausgewählt. Du kannst so viele Stellen markieren und hinzufügen, wie du möchtest.`,
                    imageUrl: Emoji,
                    imageWidth: 100,
                    imageHeight: 100,
                    icon: 'success',
                    imageAlt: 'Companion',
                    confirmButtonText: 'Ok',
                  });
                }}
              >
                {' '}
                Fügen Sie hervorgehobenen Text hinzu{' '}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
