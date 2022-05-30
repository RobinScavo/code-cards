import  React  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch';

import Card from '../card/Card';
import ControlPanel from '../controlPanel/ControlPanel';

import './deckDetails.css'

const DeckDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const deckLocation = location.pathname.slice(1).split('/')[0];

    const { data: deck, error, isPending } = useFetch(`http://localhost:8080${location.pathname}`);

    const handleDelete = () => {
        fetch(`http://localhost:8080${location.pathname}`, {
            method: 'DELETE'
        }).then(() => {
            navigate('/privateDecks')
        })
    }

    const quickEdit = ({ editQuestionValue, editAnswerValue, index }) => {
        const newCard = {'question': editQuestionValue, 'answer': editAnswerValue};
        const newCards = deck.cards;
        newCards.splice(index, 1, newCard);
        const replacementCards = {"cards": newCards}
        console.log(replacementCards)

        fetch(`http://localhost:8080${location.pathname}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(replacementCards)
        }).then (() => {
            window.location.reload();
        })
    }

    return (
        <div className="deck-detail">

            <ControlPanel
                handleDelete={handleDelete}
                deckControls={deckLocation === 'privateDecks'}
                deck={deck}
            />

            <div className="card-container">
                { error && <div>Could not fetch data</div>}
                { isPending && <h1 className='loading-text'>Loading...</h1>}
                {deck.cards && deck.cards.map((card, index) => (
                    <Card
                        index={index}
                        key={`${deck._id}index${index}`}
                        card={card}
                        quickEdit={quickEdit}
                    />
                ))}
            </div>
        </div>
     );
}

export default DeckDetails;
