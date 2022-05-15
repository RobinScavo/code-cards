import  React  from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './card.css'

const Card = ({ card }) => {
    const [editQuestionValue, setEditQuestionValue] = useState(card.question);
    const [editAnswerValue, setEditAnswerValue] = useState(card.answer);
    const [editMode, setEditMode] = useState(false);
    const location = useLocation();

    const handleEditMode = () => {
        setEditMode(true)
    }

    const handleEditCard = ({ editQuestionValue, editAnswerValue }) => {
        const newCard = {'question': editQuestionValue, 'answer': editAnswerValue};
        console.log(newCard)

        fetch(`http://localhost:3000${location.pathname}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
        })
    }

    return (
        <div className="card">
            {!editMode && <h1>{card.question}</h1>}
            {!editMode && <h1>{card.answer}</h1>}
            {!editMode && <button
                className="edit-button"
                onClick={handleEditMode}
            >Edit Card</button>}

            {editMode && <input
                defaultValue={card.question}
                onChange={(e) => setEditQuestionValue(e.target.value)}
            />}
            {editMode && <input
                defaultValue={card.answer}
                onChange={(e) => setEditAnswerValue(e.target.value)}
            />}
            {editMode && <button
                className="edit-button"
                onClick={() => {
                    handleEditCard ({ editQuestionValue, editAnswerValue })
                    setEditMode(false)
                }}
            >Save Changes</button>}
        </div>
     );
}

export default Card;
