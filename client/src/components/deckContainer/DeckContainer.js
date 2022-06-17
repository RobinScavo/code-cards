import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    getPublicDecks,
    getPrivateDecks,
    reset
  } from '../../redux/decks/decksSlice';

import Deck from '../deck/Deck';
import ControlPanel from '../controlPanel/ControlPanel';
import Spinner from '../spinner/Spinner';

import './deckContainer.scss';

const DeckContainer = ({ showHomeButton, showCreateButton, showMyDecksButton, showYourDecksButton }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const {user} = useSelector((state) => state.auth);
    const {decks, isLoading, isError, message} = useSelector((state) => state.decks);

    const userLocation = location.pathname.split('/')[2];
    const route = userLocation ? 'privateDecks/' : '';
    console.log(userLocation)

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        // if (!user) {
        //     navigate('/login');
        // }

        if (userLocation !== 'privateDecks') {
          dispatch(getPublicDecks());
        } else if (userLocation === 'privateDecks') {
          dispatch(getPrivateDecks());
        }

        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch, userLocation]);

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="deck-detail">
            <ControlPanel
                showHomeButton={showHomeButton}
                showMyDecksButton={showMyDecksButton}
                showCreateButton={showCreateButton}
                showYourDecksButton = {showYourDecksButton}
                user={user}
            />

            <section className='deck-container-heading'>
                {user && <p className='deck-container-title'
                    >~ Your private library ~</p>
                }

                {!user && <p className='deck-container-title'
                    >~ Your public library ~</p>
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
                            privateBool
                        />
                    </Link>
                ))}
            </div>
        </div>
     );
}

export default DeckContainer;
