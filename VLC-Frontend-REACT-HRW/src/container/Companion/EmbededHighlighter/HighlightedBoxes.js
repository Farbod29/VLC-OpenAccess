import React from 'react';
// import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';

// import { TiEdit } from 'react-icons/ti';
import './highlight.css';

const HighlightedBoxes = ({
  highlightedBoxListChild,
  removeHighlightBoxFromTheListChild,
  fertigStatusChild,
}) => {
  // const [edit, setEdit] = useState({ id: null, value: '',});
  return highlightedBoxListChild.map((highlightedBox, index) => (
    <p
      className="highlightedBoxes"
      // className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={highlightedBox.id}>{highlightedBox.text}</div>
      {fertigStatusChild ? (
        <></>
      ) : (
        <div className="icons">
          <RiCloseCircleLine
            disabled={fertigStatusChild}
            onClick={() =>
              removeHighlightBoxFromTheListChild(highlightedBox.id)
            }
            className="delete-icon"
          />
        </div>
      )}
    </p>
  ));
};

export default HighlightedBoxes;
