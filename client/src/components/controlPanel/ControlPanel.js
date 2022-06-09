import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
                <button
                    className='btn'
                    onClick={handleDelete}
                >Delete Deck</button>
                <Link
                    className='btn'
                    to='/createDeck'
                >Create Deck</Link>
                </>
            }

            {}

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
