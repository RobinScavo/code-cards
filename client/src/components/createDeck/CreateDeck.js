import  React  from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDeck } from '../../features/decks/decksSlice';

import './createDeck.css';

const CreateDeck = () => {
    const {user} = useSelector((state) => state.auth);

    const [author, setAuthor] = useState(user.name);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('Javascript');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question && answer) {
            handleAddCard(e);
        }
        const deck = { user: user._id, author, title, subject, cards, 'likes': 0, 'published': false }
        console.log('CREATE DECK', deck)

        dispatch(createDeck(deck))

        navigate('/decks/privateDecks')
    }

    const handleAddCard = (e) => {
        const questionInput = document.querySelectorAll('.QA');

        e.preventDefault()
        if (!question || !answer) {
            alert('Please fill out the current card first.')
        } else {
            const newCard = {'question': question, 'answer': answer};
            const cardsCopy = cards;
            cardsCopy.push(newCard);

            questionInput.forEach(input => {
                input.value = '';
            });

            setCards(cardsCopy);
            setAnswer('');
            setQuestion('');
        }
    }

    return (
        <div className="create-deck">
            <Link
                className="btn"
                to='/privateDecks'
            >Cancel</Link>

            <h2 className='create-title'>Create a new deck:</h2>

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
                    className='create-input QA'
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <label className='create-label'>Answer</label>
                <input
                    className='create-input QA'
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
                    type='submit'
                    className="btn create-button"
                    // onClick={handleSubmit}
                >Submit Deck</button>

            </form>
        </div>
     );
}

export default CreateDeck;
