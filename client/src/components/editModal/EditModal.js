import  React  from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './editModal.css';

const EditModal = ({ toggleEditModal, deck }) => {
    const [author, setAuthor] = useState(deck.author);
    const [title, setTitle] = useState(deck.title);
    const [subject, setSubject] = useState(deck.subject);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState(deck.cards);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [cardIndex, setCardIndex ] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question && answer) {
            handleAddCard(e);
        }
        const deck = { author, title, subject, cards, 'likes': 0 }

        setIsPending(true)

        fetch('http://localhost:3000/privateDecks', {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(deck)
        }).then(() => {
            setIsPending(false);
            navigate('/privateDecks')
        })
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
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                {!isPending && <button
                    className="btn"
                    onClick={toggleEditModal}
                >Cancel</button>}

                <h2 className='create-title'>Edit deck:</h2>

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

                    <div className="card-toggle-div">
                        <h2>Card {cardIndex + 1}</h2>
                        {cardIndex > 0 && <button onClick={() => setCardIndex(cardIndex -1)} className='btn card-toggle-button'>Previous</button>}
                        {cardIndex < cards.length-1 && <button onClick={() => setCardIndex(cardIndex +1)} className="btn card-toggle-button">Next</button>}
                    </div>

                    <label className='create-label'>Question</label>
                    <input
                        className='create-input QA'
                        type="text"
                        required
                        value={cards[cardIndex].question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    <label className='create-label'>Answer</label>
                    <input
                        className='create-input QA'
                        type="text"
                        required
                        value={cards[cardIndex].answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                    {!isPending && <button
                        className="btn create-button"
                        onClick={handleAddCard}
                    >Add Card</button>}

                    {!isPending && <button
                        className="btn create-button"
                        onClick={handleSubmit}
                    >Save Changes</button>}

                    {isPending && <button
                        className="btn create-button"
                        disabled
                    >Sending...</button>}

                </form>
            </div>
        </div>
        );
}


export default EditModal;
