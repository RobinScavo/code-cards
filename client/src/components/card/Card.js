import  React  from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './card.scss'

const Card = ({ question, answer, handleQuickEdit, index, userLocation }) => {
    const [editQuestionValue, setEditQuestionValue] = useState(question);
    const [editAnswerValue, setEditAnswerValue] = useState(answer);
    const [editMode, setEditMode] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const handleEditMode = () => setEditMode(true);

    const flippedClass = flipped ? 'flipped' : '';

    return (
        <div className={`card ${flippedClass}`} onClick={() => setFlipped(!flipped)}>

        <div className={`question`}>

            {/* TEXT AND EDIT BUTTON */}
            {!editMode &&  <h1>{question}</h1>}
            {!editMode && userLocation === 'privateDecks' && <button
                index={index}
                className="edit-button"
                onClick={handleEditMode}
            >Edit Card</button>}

            {/* EDIT INPUTS AND SAVE BUTTON */}
            {editMode && !flipped && <input
                defaultValue={question}
                onChange={(e) => setEditQuestionValue(e.target.value)}
            />}

            {editMode && <button
                className="edit-button btn"
                onClick={() => {
                    handleQuickEdit ({ editQuestionValue, index })
                    setEditMode(false)
                }}
            >Save Changes</button>}
            </div>
            {/* Answer */}
            <div className={`answer`}>

                {/* TEXT AND EDIT BUTTON */}
                {!editMode &&  <h1>{answer}</h1>}
                {!editMode && userLocation === 'privateDecks' && <button
                    index={index}
                    className="edit-button"
                    onClick={handleEditMode}
                >Edit Card</button>}

                {/* EDIT INPUTS AND SAVE BUTTON */}
                {editMode && flipped && <input
                    defaultValue={answer}
                    onChange={(e) => setEditAnswerValue(e.target.value)}
                />}

                {editMode && <button
                    className="edit-button btn"
                    onClick={() => {
                        handleQuickEdit ({ editAnswerValue, index })
                        setEditMode(false)
                    }}
                >Save Changes</button>}
            </div>

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
