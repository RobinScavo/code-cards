import React from 'react';
import { useLocation } from 'react-router-dom';

import './deck.css';

const Deck = ({ deck }) => {
    const location = useLocation();
    const deckLocation = location.pathname.slice(1).split('/')[0];
    const publicDeck = deck.published ? 'Public' : 'Private';

    return (
        <div
            className="deck"
        >
            <h1>{deck.subject}</h1>
            <h2>{deck.title}</h2>
            <p>{deck.author}</p>
            {deckLocation !== 'decks' &&
                <p>{publicDeck}</p>
            }
            <p>Uploads: {deck.likes}</p>
        </div>
     );
}

export default Deck;
