import  React  from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editDeck, reset } from '../../features/decks/decksSlice';
import { toast } from 'react-toastify';

import './editModal.css';

const EditModal = ({ deck, toggleEditModal }) => {
    const [author, setAuthor] = useState(deck.author);
    const [title, setTitle] = useState(deck.title);
    const [subject, setSubject] = useState(deck.subject);
    const [cards, setCards] = useState(deck.cards);
    const [cardIndex, setCardIndex ] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(cards[cardIndex].question);
    const [currentAnswer, setCurrentAnswer] = useState(cards[cardIndex].answer);
    const [cardWasEdited, setCardWasEdited] = useState(false);
    const [addingNewCard, setAddingNewCard] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (addingNewCard && currentQuestion && currentAnswer) {
            handleAddCard();
        }

        const newDeckCards = cards.filter((card => card.question && card.answer));
        const newDeck = { id: deck._id, data: {_id: deck._id, user: deck.user, author, title, subject, cards: newDeckCards }};

        try {
            dispatch(editDeck(newDeck));
            dispatch(reset())
            toggleEditModal()
            dispatch(reset())
            toast.success('Deck has been updated.')
            navigate(`/decks/privateDecks`)
        } catch {
            toast.error('Something went wrong.')
        }
    }

    const handleAddCard = () => {
        let newCards;

        if (!currentAnswer || !currentQuestion) {
            alert('Please complete the current card first.');
            return;
        } else {
            setAddingNewCard(true)
        }

        if (addingNewCard) {handleCardWasEdited()};

        let newCard = {'question': '', 'answer': ''};
        newCards = cards;
        newCards.push(newCard);

        setCards(newCards)
        setCurrentQuestion('');
        setCurrentAnswer('');
        setCardIndex(cards.length-1);
    }

    const handleDeleteCard = () => {
        if (!cards.length) return;

        let newCards = cards;
        newCards.splice(cardIndex, 1)
        setCardIndex(cardIndex -1)
        setCards(newCards);
        setCurrentQuestion(cards[cardIndex -1].question);
        setCurrentAnswer(cards[cardIndex -1].answer);
    }

    const handleCardWasEdited = () => {
        if (!cardWasEdited) return
        let newCards = cards;
        newCards = newCards.splice(cardIndex, 1, {'question': currentQuestion, 'answer': currentAnswer})
        setCards(newCards);
        setCardWasEdited(false)
    }

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <button
                    className="btn"
                    onClick={toggleEditModal}
                >Cancel</button>

                <h2 className='create-title'>Edit deck:</h2>

                <form className='create-form'>
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

                        {cardIndex > 0 && <button
                            className='btn card-toggle-button'
                            onClick = {(e) => {
                                e.preventDefault()
                                setCardIndex(cardIndex -1)
                                setCurrentQuestion(cards[cardIndex -1].question)
                                setCurrentAnswer(cards[cardIndex -1].answer)
                                handleCardWasEdited()
                            }}
                        >Previous</button>}

                        {cardIndex < cards.length-1 && <button
                            className='btn card-toggle-button'
                            onClick = {(e) => {
                                e.preventDefault()
                                setCardIndex(cardIndex +1)
                                setCurrentQuestion(cards[cardIndex +1].question)
                                setCurrentAnswer(cards[cardIndex +1].answer)
                                handleCardWasEdited()
                            }}
                        >Next</button>}
                    </div>

                    <label className='create-label'>Question</label>
                    <input
                        className='create-input QA'
                        type="text"
                        required
                        value={currentQuestion}
                        onChange={(e) => {
                            setCurrentQuestion(e.target.value)
                            setCardWasEdited(true)
                        }}
                    />

                    <label className='create-label'>Answer</label>
                    <input
                        className='create-input QA'
                        type="text"
                        required
                        value={currentAnswer}
                        onChange={(e) => {
                            setCurrentAnswer(e.target.value)
                            setCardWasEdited(true)
                        }}
                    />

                    <button
                        className="btn create-button"
                        onClick={(e) => {
                            e.preventDefault()
                            handleAddCard()
                        }}
                    >Add Card</button>

                    {cards.length > 1 && <button
                        className="btn create-button"
                        onClick={(e) => {
                            e.preventDefault()
                            handleDeleteCard()
                        }}
                    >Remove Card</button>}

                    <button
                        className="btn create-button"
                        onClick={handleSubmit}
                    >Save Changes</button>

                </form>
            </div>
        </div>
        );
}


export default EditModal;
