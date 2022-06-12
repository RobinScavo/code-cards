import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getPublicDecks, getPrivateDecks, reset} from '../../features/decks/decksSlice'

import Deck from '../deck/Deck';
import ControlPanel from '../controlPanel/ControlPanel';
import Spinner from '../spinner/Spinner'

import './deckContainer.css';

const DeckContainer = ({ privateDecks }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const deckLocation = location.pathname.slice(1).split('/')[1];

    const {user} = useSelector((state) => state.auth)
    const {decks, isLoading, isError, message} = useSelector((state) => state.decks)
    const route = privateDecks ? 'privateDecks/' : ''

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (privateDecks && !user) {
            navigate('/login')
        }

        if (!privateDecks) {
            dispatch(getPublicDecks())
        } else if (privateDecks) {
            dispatch(getPrivateDecks())
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch, privateDecks])


    if (isLoading) {
        return <Spinner />
    }


    return (
        <div className="deck-detail">
            <ControlPanel />

            <section className='deck-container-heading'>
                {user &&
                    <h1 className='deck-container-name'>Welcome {user && user.name}!</h1>
                }
                {deckLocation === 'privateDecks' &&
                    <p className='deck-container-title'>~ Your private library ~</p>
                }
                {!user &&
                    <h1 className='deck-container-name'>Welcome to OpenBook!</h1>
                }
                {deckLocation !== 'privateDecks' &&
                    <p className='deck-container-title'>~ Your public library ~</p>
                }
            </section>

            <div className="deck-container">
                {decks && decks.length > 0 && decks.map((deck) => (
                    <Link
                        to={`/decks/${route}${deck._id}`}
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
