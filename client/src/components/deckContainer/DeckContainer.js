import { useState, useEffect } from "react";

import Deck from '../deck/Deck';

import './deckContainer.css'

const DeckContainer = () => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function getDecks() {
            const response = await fetch(`http://localhost:3000/publicDecks`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const decks = await response.json();
            console.log(decks)
            setDecks(decks)
        }

        getDecks();

        return;
    }, [])

    // const [decks, setDecks] = useState([
    //     {id: 1, author: 'Test One Author', subject: 'Test One Subject', likes: 1, cards: [{question: 'question', answer: 'answer'}, {question: 'second question', answer: 'second answer'}]},
    //     {id: 2, author: 'Test Two Author', subject: 'Test Two Subject', likes: 1, cards: [{question: 'question', answer: 'answer'}, {question: 'second question', answer: 'second answer'}]},
    //     {id: 3, author: 'Test Three Author', subject: 'Test Three Subject', likes: 1, cards: [{question: 'question', answer: 'answer'}, {question: 'second question', answer: 'second answer'}]}
    // ]);

    return (
        <div className="deck-container">
            {decks.map((deck) => (
                <Deck key={deck.id} deck={deck}/>
            ))}
        </div>
     );
}

export default DeckContainer;
