import React from 'react';
import PropTypes from 'prop-types';

import './deck.scss';

const Deck = ({ deck, userLocation }) => {
    const { subject, title, author, likes, published } = deck
    const publicDeck = published ? 'Public' : 'Private';

    return (
        <div className="deck">
            <h1 data-test='subjectText'>{subject}</h1>
            <h2 data-test='titleText'>{title}</h2>
            <p data-test='authorText'>{author}</p>
            {userLocation === 'privateDecks' &&
                <p data-test='publishedText'>{publicDeck}</p>
            }
            <p data-test='uploadText'>Uploads: {likes}</p>
        </div>
     );
}

Deck.propTypes = {
    deck: PropTypes.shape({
        subject: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        uploads: PropTypes.number,
    }),
    userLocation: PropTypes.string
}

export default Deck;
