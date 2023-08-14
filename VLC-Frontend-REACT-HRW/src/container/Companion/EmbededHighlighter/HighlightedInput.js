import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Emoji from './logo.png'; //
import './highlight.css';
import littleZoo from '../ImagesAndICONS/ZooPosting.jpg';
// import Element from './path/to/element/class';

export default function HighlightedInput({ onSubmit, fertigStatusChild }) {
  // was props //
  const [highlightedText, setHighlightedText] = useState(
    'Dein markierter Text wird hier angezeigt'
  );
  // const [fertigStatus, setFertigStatus] = useState(false);

  useEffect(() => {
    const saveSelection = () => {
      let selectedJsxTag = window.getSelection().anchorNode.parentNode;
      if (selectedJsxTag.hasAttribute('id')) {
        let extractId = selectedJsxTag.id;
        if (extractId === 'targetSentenceForHighlight')
          setHighlightedText(window.getSelection().toString());
        // console.log(extractId);
        // console.log('extractId');
      }
    };
    document.addEventListener('mouseup', saveSelection);
    // inputRef.current.focus();
    return () => document.removeEventListener('mouseup', saveSelection);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      // props.onSubmit
      id: Math.floor(Math.random() * 10000),
      text: highlightedText,
      timestamp: Date.now(),
    });
    setHighlightedText('');
    Swal.fire({
      title: 'Markierter Teil aufgenommen',
      text: `Du hast erfolgreich "${highlightedText}" markiert und ausgewählt. Du kannst so viele Stellen markieren und hinzufügen, wie du möchtest.`,
      imageUrl: Emoji,
      imageWidth: 100,
      imageHeight: 100,
      icon: 'success',
      imageAlt: 'Companion',
      confirmButtonText: 'Ok',
    });
  };

  return (
    <>
      <section className="card">
        <img className="img-holder" src={littleZoo}></img>
        <div className="ZooText" id="targetSentenceForHighlight">
          LittleZoo Werbung: Unser neues Bastelset stellt eine schöne, ideale
          Welt dar! Kinder können wirklich alles, was es im Zoo zu sehen und zu
          erleben gibt, nachspielen. Mit ihnen können Rollenspiele geübt und
          Verhaltensweisen lebensecht nachgeahmt werden. Ohne Einschränkungen!
        </div>
        <div className="highlightedTxt">{highlightedText}</div>
        <button
          className="btn"
          onClick={handleSubmit}
          disabled={fertigStatusChild}
        >
          Okay!
        </button>
      </section>
      <div></div>
    </>
  );
}
// disabled={finish}
