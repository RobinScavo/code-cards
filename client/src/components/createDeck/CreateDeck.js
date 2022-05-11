import  React  from 'react';
import { useState } from 'react';

import './createDeck.css';

const CreateDeck = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('Javascript');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question && answer) {
            handleAddCard();
        }
        const deck = { author, title, subject, cards }

        console.log(deck)
    }

    const handleAddCard = () => {
        if (!question || !answer) {
            alert('Please fill out the current card first.')
        } else {
            console.log(question, answer)
            //Spread
            setCards(...cards, {'question': question, 'answer': answer})
        }
    }

    return (
        <div className="create-deck">
            <h2>Create a new deck:</h2>
            <form className='create-form' onSubmit={handleSubmit}>
                <label className='create-label'>Author</label>
                <input
                    className='create-input'
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <label className='create-label'>Title</label>
                <input
                    className='create-input'
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className='create-label'>Subject</label>
                <select
                    name="subject"
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="Javascript">Javascript</option>
                    <option value="React">React</option>
                    <option value="CSS">CSS</option>
                    <option value="Web Technologies">Web Technologies</option>
                    <option value="Node.js">Node.js</option>
                </select>

                <label className='create-label'>Question</label>
                <input
                    className='create-input'
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <label className='create-label'>Answer</label>
                <input
                    className='create-input'
                    type="text"
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <button
                    className="btn create-button"
                    onClick={handleAddCard}
                >Add Card</button>

                <button
                    className="btn create-button"
                    onClick={handleSubmit}
                >Submit Deck</button>
            </form>
        </div>
     );
}

export default CreateDeck;
