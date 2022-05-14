import  React  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch';

import Card from '../card/Card';
import ControlPanel from '../controlPanel/ControlPanel';

import './deckDetails.css'

const DeckDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { data: deck, error, isPending } = useFetch(`http://localhost:3000${location.pathname}`);

    const handleDelete = () => {
        fetch(`http://localhost:3000${location.pathname}`, {
            method: 'DELETE'
        }).then(() => {
            navigate('/privateDecks')
        })
    }

    const handleEditCard = ({ editQuestionValue, editAnswerValue }) => {
        const newCard = {'question': editQuestionValue, 'answer': editAnswerValue};
        console.log(newCard)

        fetch(`http://localhost:3000${location.pathname}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(edit)
        })
    }

    const handleEditDeck = (newDeck) => {
        // console.log(newDeck)

        // fetch(`http://localhost:3000${location.pathname}`, {
        //     method: 'PATCH',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(newDeck)
        // })
    }

    return (
        <div className="deck-detail">

            <ControlPanel
                handleDelete={handleDelete}
                handleEditDeck={handleEditDeck}
                deckControls={true}
                deck={deck}
            />

            <div className="card-container">
                { error && <div>Could not fetch data</div>}
                { isPending && <h1 className='loading-text'>Loading...</h1>}
                {deck.cards && deck.cards.map((card, index) => (
                    <Card
                        key={`${deck._id}index${index}`}
                        card={card}
                        handleEditCard={handleEditCard}
                    />
                ))}
            </div>
        </div>
     );
}

export default DeckDetails;
