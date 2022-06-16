import React from 'react';

import './deck.scss';

const Deck = ({ deck, userLocation }) => {
    const publicDeck = deck.published ? 'Public' : 'Private';

    return (
        <div className="deck">
            <h1 data-test='subjectText'>{deck.subject}</h1>
            <h2 data-test='titleText'>{deck.title}</h2>
            <p data-test='authorText'>{deck.author}</p>
            {userLocation !== 'privateDecks' &&
                <p data-test='publishedText'>{publicDeck}</p>
            }
            <p data-test='uploadText'>Uploads: {deck.likes}</p>
        </div>
     );
}

export default Deck;
