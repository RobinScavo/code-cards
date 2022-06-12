import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { deleteDeck, editDeck } from '../../features/decks/decksSlice';
import { toast } from 'react-toastify';

import EditModal from '../editModal/EditModal';

import './controlPanel.css';

const ControlPanel = ({ deck }) => {
    const [editModalVisible, setEditModalVisible] =  useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const location = useLocation();
    const userLocation = location.pathname.split('/')[2];
    const userSubLocation = location.pathname.split('/')[3];

    const toggleEditModal = () => setEditModalVisible(!editModalVisible);

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/decks')
    }

    const handleDelete = () => {
        dispatch(deleteDeck(deck._id));
        navigate('/decks/privateDecks')
    }

    const handleEdit = () => {
        setEditModalVisible(true)
    }

    const handlePublish = () => {
        const copyDeck = {...deck}
        copyDeck.published = true
        toast.success('This deck has been published!')
        dispatch(editDeck(copyDeck))
        dispatch(reset())
    }

    const handleUpload = () => {
        const theirCopy = {...deck}
        theirCopy.likes = theirCopy.likes + 1;

        const myCopy = {...deck}
        myCopy.user = user._id
        delete myCopy._id

        console.log('CONTROL PANEL', theirCopy, myCopy)
        dispatch(editDeck(theirCopy))
        dispatch(reset())
    }

    return (
        <div className="control-panel">
            {editModalVisible &&
                <EditModal
                    toggleEditModal={toggleEditModal}
                    deck={deck}/>
            }

            {/* HOME */}
            {userLocation  &&
                <Link
                    className='btn control-button'
                    to='/decks'
                >Home</Link>
            }

            {/* LOG OUT/ CREATE DECK */}
            {user &&
                <>
                <button
                    className='btn'
                    onClick={handleLogout}
                >Log Out</button>

                <Link
                    className='btn'
                    to='/createDeck'
                >Create Deck</Link>
                </>
            }

            {/* LOG IN */}
            {!user &&
                <Link
                    className='btn control-button'
                    to='/login'
                >Log In</Link>
            }

            {/* DELETE DECK */}
            {userSubLocation &&
                <button
                    className='btn'
                    onClick={handleDelete}
                >Delete Deck</button>
            }

            {/* EDIT DECK */}
            {userSubLocation  &&
                <button
                    className='btn'
                    onClick={handleEdit}
                >Edit Deck</button>
            }

            {/* PRIVATE DECKS */}
            {user && (userLocation !== 'privateDecks' || userSubLocation) &&
                <Link
                    className='btn'
                    to='/decks/privateDecks'
                >Your Decks</Link>
            }

            {/* PUBLISH */}
            {deck && !deck.published &&
                <button
                    className="btn"
                    onClick={handlePublish}
                >Publish</button>
            }

            {/* UPLOAD DECK */}
            {userLocation && userLocation !== 'privateDecks' && user._id !== deck.user &&
                <button
                    className="btn"
                    onClick={handleUpload}
                >Upload</button>
            }

        </div>
     );
}

export default ControlPanel;
