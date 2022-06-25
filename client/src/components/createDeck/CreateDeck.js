import  React, { useEffect }  from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDeck } from '../../redux/decks/decksSlice';

import './createDeck.scss';

const CreateDeck = () => {
    const {user} = useSelector((state) => state.auth);

    const [author, setAuthor] = useState('');
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
        const deck = {
            user: user._id ,
            author,
            title,
            subject,
            cards,
            'likes': 0,
            'published': false
        }

        dispatch(createDeck(deck));

        navigate('/decks/privateDecks');
    }

    useEffect(() => {
        setAuthor(user.name || '')
    }, [user])

    const handleAddCard = (e) => {
        const questionInput = document.querySelectorAll('.QA');

        e.preventDefault();
        if (!question || !answer) {
            alert('Please fill out the current card first.');
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
                className="btn create-button"
                to='/decks/privateDecks'
            >Cancel</Link>

            <h2 className='create-title'>Create a new deck</h2>

            <form className='create-form' onSubmit={handleSubmit}>
                <label className='create-label'>Author</label>
                <input
                    className='create-input'
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    data-testid='author-input'
                />

                <label className='create-label'>Title</label>
                <input
                    className='create-input'
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    data-testid='title-input'
                />

                <label className='create-label'>Subject</label>
                <select
                    className='create-selector'
                    name="subject"
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    data-testid='subject-input'
                >
                    <option className='create-option' value="Javascript">Javascript</option>
                    <option className='create-option' value="React">React</option>
                    <option className='create-option' value="CSS">CSS</option>
                    <option className='create-option' value="Web Technologies">Web Technologies</option>
                    <option className='create-option' value="Node.js">Node.js</option>
                    <option className='create-option' value="Drupal">Drupal</option>
                    <option className='create-option' value="HTML5">HTML5</option>
                    <option className='create-option' value="SASS">SASS</option>
                    <option className='create-option' value="NPM">NPM</option>
                    <option className='create-option' value="Wordpress">Wordpress</option>
                    <option className='create-option' value="Mongo">Mongo</option>
                </select>

                <label className='create-label'>Question</label>
                <input
                    className='create-input QA'
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    data-testid='question-input'
                />

                <label className='create-label'>Answer</label>
                <input
                    className='create-input QA'
                    type="text"
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    data-testid='answer-input'
                />

                <button
                    className="btn create-button"
                    onClick={handleAddCard}
                    data-testid='add-card-button'
                >Add Card</button>

                <button
                    type='submit'
                    className="btn create-button"
                >Submit Deck</button>

            </form>
        </div>
     );
}

export default CreateDeck;
