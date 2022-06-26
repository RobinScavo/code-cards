import  React  from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './card.scss'

const Card = ({ text, handleQuickEdit, index, userLocation }) => {
    const [editQuestionValue, setEditQuestionValue] = useState(text);
    const [editAnswerValue, setEditAnswerValue] = useState(text);
    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => setEditMode(true);
    console.log(userLocation)
    return (
        <div className="card">

            {/* TEXT AND EDIT BUTTON */}
            {!editMode && <h1>{text}</h1>}
            {!editMode && userLocation === 'privateDecks' && <button
                index={index}
                className="edit-button"
                onClick={handleEditMode}
            >Edit Card</button>}

            {/* EDIT INPUTS AND SAVE BUTTON */}
            {editMode && <input
                defaultValue={text}
                onChange={(e) => setEditQuestionValue(e.target.value)}
            />}

            {editMode && <input
                defaultValue={text}
                onChange={(e) => setEditAnswerValue(e.target.value)}
            />}

            {editMode && <button
                className="edit-button btn"
                onClick={() => {
                    handleQuickEdit ({ editQuestionValue, editAnswerValue, index })
                    setEditMode(false)
                }}
            >Save Changes</button>}
        </div>
     );
}

Card.propTypes = {
    card: PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
    }),
    handleQuickEdit: PropTypes.func,
    index: PropTypes.number,
    userLocation: PropTypes.string
}

export default Card;
