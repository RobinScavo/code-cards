import React from 'react';
import PropTypes from 'prop-types';

import './deck.scss';

const Deck = ({ deck, privateBool }) => {
    const { subject, title, author, likes, published } = deck
    const publicDeck = published ? 'Public' : 'Private';

    return (
        <div className="deck">
            <h1 data-test='subjectText'>{subject}</h1>
            <h2 data-test='titleText'>{title}</h2>
            <p data-test='authorText'>{author}</p>
            {privateBool &&
                <p data-test='publishedText'>{publicDeck}</p>
            }
            <p data-test='uploadText'>Uploads: {likes}</p>
        </div>
     );
}

Deck.propTypes = {
    subject: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    uploads: PropTypes.number,
    published: PropTypes.bool,
    userLocation: PropTypes.string
}

export default Deck;
