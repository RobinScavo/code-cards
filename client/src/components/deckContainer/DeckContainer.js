import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link
                    to={`/${collection}/${deck._id}`}
                    key={deck._id}
                >
                    <Deck
                        key={deck._id}
                        deck={deck}
                    />
                </Link>
            ))}
        </div>
     );
}

export default DeckContainer;
