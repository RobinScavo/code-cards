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

    const { data: deck, error, isPending } = useFetch(`http://localhost:3000${location.pathname}`);

    const handleDelete = () => {
        fetch(`http://localhost:3000${location.pathname}`, {
            method: 'DELETE'
        }).then(() => {
            navigate('/privateDecks')
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
                        key={`${deck._id}index${index}`}
                        card={card}
                    />
                ))}
            </div>
        </div>
     );
}

export default DeckDetails;
