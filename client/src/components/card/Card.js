import  React  from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './card.scss'

const Card = ({ card, handleQuickEdit, index, userLocation }) => {
    const [editQuestionValue, setEditQuestionValue] = useState(card.question);
    const [editAnswerValue, setEditAnswerValue] = useState(card.answer);
    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => setEditMode(true);

    return (
        <div className="card">

            {/* RENDER TEXT AND EDIT BUTTON */}
            {!editMode && <h1>{card.question}</h1>}
            {!editMode && <h1>{card.answer}</h1>}
            {!editMode && userLocation === 'privateDecks' && <button
                index={index}
                className="edit-button"
                onClick={handleEditMode}
            >Edit Card</button>}

            {/* RENDER INPUTS AND SAVE BUTTON */}
            {editMode && <input
                defaultValue={card.question}
                onChange={(e) => setEditQuestionValue(e.target.value)}
            />}
            {editMode && <input
                defaultValue={card.answer}
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
