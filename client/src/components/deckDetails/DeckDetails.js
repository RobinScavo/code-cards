import  React  from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../useFetch';

import Card from '../card/Card'

import './deckDetails.css'

const DeckDetails = () => {
    const location = useLocation();
    const { data: deck, error, isPending } = useFetch(`http://localhost:3000${location.pathname}`)

    return (
        <div className="card-container">
            { error && <div>Could not fetch data</div>}
            { isPending && <h1 className='loading-text'>Loading...</h1>}
            {deck.cards && deck.cards.map((card, index) => (
                <Card card={card}  key={`${deck._id}index${index}`}/>
            ))}
        </div>
     );
}

export default DeckDetails;
