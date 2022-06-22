import  React, { useEffect }  from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editDeck, reset } from '../../redux/decks/decksSlice';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import './editDeck.scss';

const EditDeck = ({ deck, toggleEditDeck }) => {
    const [author, setAuthor] = useState(deck.author);
    const [title, setTitle] = useState(deck.title);
    const [subject, setSubject] = useState(deck.subject);
    const [cards, setCards] = useState(deck.cards);
    const [cardIndex, setCardIndex ] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [cardWasEdited, setCardWasEdited] = useState(false);
    const [addingNewCard, setAddingNewCard] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cards[cardIndex]) {
            setCurrentQuestion(cards[cardIndex].question)
            setCurrentAnswer(cards[cardIndex].answer)
        }
    }, [cardIndex])

    const handleSubmit = (e) => {
        e.preventDefault();

        let newCards = [...cards];

        if (addingNewCard && currentQuestion && currentAnswer) {
            let newCard = {question: currentQuestion, answer: currentAnswer}
            newCards.push(newCard)
        }

        newCards.filter(card => card.question && card.answer)

        const newDeck = {
            id: deck._id,
            data: {
                _id: deck._id,
                user: deck.user,
                author,
                title,
                subject,
                cards: newCards
            }
        };

        try {
            dispatch(editDeck(newDeck));;
            dispatch(reset());

            toggleEditDeck();
            dispatch(reset());

            toast.success('Deck has been updated.');
            navigate(`/decks/privateDecks`);
        } catch {
            toast.error('Something went wrong.');
        }
    }

    const handleAddCard = () => {
        if (!currentAnswer || !currentQuestion) {
            toast.error('Please complete the current card first.');
            return;
        }

        if (addingNewCard) {
            let newCards = [...cards];
            let newCard = {question: currentQuestion, answer: currentAnswer}
            newCards.push(newCard)
            setCards(newCards);
            setCardIndex(cardIndex+1)
            setAddingNewCard(false)
        }

        setCurrentQuestion('');
        setCurrentAnswer('');
        setCardIndex(cards.length);
        setAddingNewCard(true)
    }

    const handleDeleteCard = () => {
        if (!cards.length) return;

        let newCards = [...cards];

        console.log(newCards, cardIndex)
        if (!currentAnswer || !currentQuestion) {
            setCardIndex(cardIndex -1)
            return;
        }
        // Remove the card and display the previous card if one exists,
        // otherwise display the next card.
        if (cardIndex > 0) {
            newCards.splice(cardIndex, 1);
            setCardIndex(cardIndex -1);
            setCards(newCards);
            setCurrentQuestion(cards[cardIndex -1].question);
            setCurrentAnswer(cards[cardIndex -1].answer);
        } else if (cards.length > 1) {
            newCards.splice(cardIndex, 1);
            setCardIndex(cardIndex +1);
            setCards(newCards);
            setCurrentQuestion(cards[cardIndex +1].question);
            setCurrentAnswer(cards[cardIndex +1].answer);
        } else {
            toast.error('Cannot remove last card in deck.')
        }
    }

    const handleCardWasEdited = () => {
        if (!cardWasEdited) return;

        let newCards = [...cards];
        newCards.splice(cardIndex, 1, {'question': currentQuestion, 'answer': currentAnswer})

        setCards(newCards);
        setCardWasEdited(false)
    }

    return (
        <div className="edit-container">
            <div className="edit-form-container">
                <button
                    className="btn"
                    onClick={toggleEditDeck}
                >Cancel</button>

                <h2 className='create-title'>Edit deck</h2>

                <form className='create-form'>
                    <label className='create-label' htmlFor='author'>Author</label>
                    <input
                        className='create-input'
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        id='author'
                        data-testid='edit-author'
                    />

                    <label className='create-label'>Title</label>
                    <input
                        className='create-input'
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        data-testid='edit-title'
                    />

                    <label className='create-label'>Subject</label>
                    <select
                        className='create-selector'
                        name="subject"
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        data-testid='edit-subject'
                    >
                        <option className='create-option' value="Javascript">Javascript</option>
                        <option className='create-option' value="React">React</option>
                        <option className='create-option' value="CSS">CSS</option>
                        <option className='create-option' value="Web Technologies">Web Technologies</option>
                        <option className='create-option' value="Node.js">Node.js</option>
                    </select>

                    <div className="card-toggle-div">
                        {cardIndex > 0 && <button
                            className='btn card-toggle-button'
                            onClick = {(e) => {
                                e.preventDefault()
                                setCardIndex(cardIndex -1)
                                setCurrentQuestion(cards[cardIndex -1].question)
                                setCurrentAnswer(cards[cardIndex -1].answer)
                                setAddingNewCard(false)
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
                                setAddingNewCard(false)
                                handleCardWasEdited()
                            }}
                        >Next</button>}
                    </div>

                    <h2 className='card-index-text'>Card {cardIndex +1}</h2>

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
                        data-testid='edit-question'
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
                        data-testid='edit-answer'
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

EditDeck.propTypes = {
    deck: PropTypes.shape({
        author: PropTypes.string,
        title: PropTypes.string,
        subject: PropTypes.string,
        question: PropTypes.string,
        answer: PropTypes.string,
    }),
    toggleEditDeck: PropTypes.func,
}


export default EditDeck;
