import React from 'react';

import useFetch from '../../useFetch';

import Deck from '../deck/Deck';

import './deckContainer.css'

const DeckContainer = ({ collection }) => {
    const { data, isPending, error } = useFetch(`http://localhost:3000/${collection}`);

    return (
        <div className="deck-container">
            { error && <div>Could not fetch data</div>}
            { isPending && <h1 className='loading-text'>Loading...</h1>}
            {data && data.map((deck) => (
                <Deck key={deck._id} deck={deck}/>
            ))}
        </div>
     );
}

export default DeckContainer;
