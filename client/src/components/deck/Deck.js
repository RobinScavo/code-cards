import React from 'react';

import './deck.css';

const Deck = ({ deck }) => {
    return (
        <div
            className="deck"
        >
            <h1>{deck.subject}</h1>
            <h2>{deck.title}</h2>
            <p>{deck.author}</p>
            {/* <p>Likes: {deck.likes}</p> */}
        </div>
     );
}

export default Deck;
