import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { deleteDeck } from '../../features/decks/decksSlice';
// import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

// import LoginModal from '../loginModal/LoginModal';
import EditModal from '../editModal/EditModal';

import './controlPanel.css';

const ControlPanel = ({ deck }) => {
    // const [loginModalVisible, setLoginModalVisible] =  useState(false);
    const [editModalVisible, setEditModalVisible] =  useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const location = useLocation();
    const userLocation = location.pathname.slice(1).split('/')[0];
    const privateLocation = location.pathname.slice(1).split('/')[1];
    console.log(privateLocation)

    // const toggleLoginModal = () => setLoginModalVisible(!loginModalVisible);
    const toggleEditModal = () => setEditModalVisible(!editModalVisible);

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/publicDecks')
    }

    const handleDelete = () => {
        dispatch(deleteDeck(deck._id))
    }

    return (
        <div className="control-panel">
            {/* {loginModalVisible && <LoginModal toggleLoginModal={toggleLoginModal} />} */}
            {editModalVisible && <EditModal toggleEditModal={toggleEditModal} deck={deck}/>}


            <Link className='btn control-button' to='/publicDecks'>Home</Link>

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

            {user && privateLocation &&
                <button
                    className='btn'
                    onClick={handleDelete}
                >Delete Deck</button>
            }

            {user && userLocation === 'publicDecks' &&
                <Link
                    className='btn'
                    to='/privateDecks'
                >Your Decks</Link>
            }

            {user && userLocation === 'publicDecks' &&
                <Link
                    className='btn'
                    to='/privateDecks'
                >Your Decks</Link>
            }

            {!user &&
                <Link
                    className='btn control-button'
                    to='/login'
                >Log In</Link>
            }

        </div>
     );
}

export default ControlPanel;
