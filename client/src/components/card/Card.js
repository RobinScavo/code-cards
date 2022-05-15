import  React  from 'react';
import { useState } from 'react';

import './card.css'

const Card = ({ card, quickEdit, index }) => {
    const [editQuestionValue, setEditQuestionValue] = useState(card.question);
    const [editAnswerValue, setEditAnswerValue] = useState(card.answer);
    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => setEditMode(true);

    return (
        <div className="card">
            {!editMode && <h1>{card.question}</h1>}
            {!editMode && <h1>{card.answer}</h1>}
            {!editMode && <button
                index={index}
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
                    quickEdit ({ editQuestionValue, editAnswerValue, index })
                    setEditMode(false)
                }}
            >Save Changes</button>}
        </div>
     );
}

export default Card;
