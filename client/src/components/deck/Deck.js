import React from 'react';
import PropTypes from 'prop-types';

import {
    DiReact,
    DiDrupal,
    DiGithubBadge,
    DiHtml5,
    DiJsBadge,
    DiNodejs,
    DiNpm,
    DiSass,
    DiWordpress,
    DiAtom,
    DiCssTricks,
    DiDatabase
} from 'react-icons/di'

import './deck.scss';

const Deck = ({ deck, userLocation }) => {
    const { subject, title, author, likes, published } = deck
    const publicDeck = published ? 'Published' : 'Private';

    return (
        <div className="deck" data-testid='deck'>
            <div className="upper-deck">

                <div className="deck-icon-container">
                    {subject === 'React' && <DiReact />}
                    {subject === 'Javascript' && <DiJsBadge />}
                    {subject === 'Drupal' && <DiDrupal />}
                    {subject === 'Github' && <DiGithubBadge />}
                    {subject === 'HTML5' && <DiHtml5 />}
                    {subject === 'SASS' && <DiSass />}
                    {subject === 'NPM' && <DiNpm />}
                    {subject === 'Node.js' && <DiNodejs />}
                    {subject === 'Wordpress' && <DiWordpress />}
                    {subject === 'Web Technologies' && <DiAtom />}
                    {subject === 'CSS' && <DiCssTricks />}
                    {subject === 'Mongo' && <DiDatabase />}
                </div>

                <div className="deck-info">
                    <h1 className='deck-subject' data-test='subjectText'>{subject}</h1>
                    <h2 className='deck-title' data-test='titleText'>{title}</h2>
                    <p className='deck-author' data-test='authorText'>{author}</p>
                </div>
            </div>

            <div className="deck-footer">
                {userLocation === 'privateDecks' &&
                    <p className='deck-published' data-test='publishedText'>{publicDeck}</p>
                }
                <p className='deck-uploads' data-test='uploadText'>Uploads: {likes}</p>
            </div>
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
