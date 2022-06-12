import  React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPrivateDeck, getPublicDeck, reset } from '../../features/decks/decksSlice'

import Card from '../card/Card';
import ControlPanel from '../controlPanel/ControlPanel';
import Spinner from '../spinner/Spinner';

import './deckDetails.css'

const DeckDetails = ({ privateDeck }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deckID = useParams().id;

    const {user} = useSelector((state) => state.auth)
    const {decks, isLoading, isError, message} = useSelector((state) => state.decks)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (privateDeck && !user) {
            navigate('/login')
        }

        if (!privateDeck) {
            dispatch(getPublicDeck(deckID))
        } else if (privateDeck) {
            dispatch(getPrivateDeck(deckID))
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch, deckID, privateDeck])

    // const quickEdit = ({ editQuestionValue, editAnswerValue, index }) => {
    //     const newCard = {'question': editQuestionValue, 'answer': editAnswerValue};
    //     const newCards = deck.cards;
    //     newCards.splice(index, 1, newCard);
    //     const replacementCards = {"cards": newCards}
    //     console.log(replacementCards)

    //     fetch(`http://localhost:8080${location.pathname}`, {
    //         method: 'PATCH',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(replacementCards)
    //     }).then (() => {
    //         window.location.reload();
    //     })
    // }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="deck-detail">

            <ControlPanel deck={decks}/>

            <div className="card-container">
                {decks.cards && decks.cards.map((card, index) => (
                    <Card
                        index={index}
                        key={`${decks._id}index${index}`}
                        card={card}
                        // quickEdit={quickEdit}
                    />
                ))}
            </div>
        </div>
     );
}

export default DeckDetails;
