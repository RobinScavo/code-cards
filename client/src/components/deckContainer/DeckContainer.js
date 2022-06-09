import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getPrivateDecks, getPublicDecks, reset} from '../../features/decks/decksSlice'

// import useFetch from '../../useFetch';

import Deck from '../deck/Deck';
import ControlPanel from '../controlPanel/ControlPanel';
import Spinner from '../spinner/Spinner'

import './deckContainer.css'

const DeckContainer = ({ collection }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {decks, isLoading, isError, message} = useSelector((state) => state.decks)
    console.log('@@@@@', decks)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (collection === 'privateDecks' && !user) {
            navigate('/login')
        }

        if (collection === 'publicDecks') {
            dispatch(getPublicDecks())
        }
        else if (collection === 'privateDecks') {
            dispatch(getPrivateDecks())
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    // const { data, isPending, error } = useFetch(`http://localhost:8080/${collection}`);
    // if (collection === 'privateDecks') {

    // } else {
    // }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="deck-detail">
            <ControlPanel />

            <section className='deck-container-heading'>
                <h1 className='deck-container-name'>Welcome {user && user.name}!</h1>
                <p className='deck-container-title'>~ Your library ~</p>
            </section>

            <div className="deck-container">
                {decks.length > 0 && decks.map((deck) => (
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
        </div>
     );
}

export default DeckContainer;
