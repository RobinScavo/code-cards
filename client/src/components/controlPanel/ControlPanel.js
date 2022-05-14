import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LoginModal from '../loginModal/LoginModal';
import EditModal from '../editModal/EditModal'

import './controlPanel.css';

const ControlPanel = ({ handleDelete, handleEditDeck, deckControls, deck }) => {
    const [loginModalVisible, setLoginModalVisible] =  useState(false);
    const [editModalVisible, setEditModalVisible] =  useState(false);

    const toggleLoginModal = () => setLoginModalVisible(!loginModalVisible);
    const toggleEditModal = () => setEditModalVisible(!editModalVisible);

    return (
        <div className="control-panel">
            {loginModalVisible && <LoginModal toggleLoginModal={toggleLoginModal} />}
            {editModalVisible && <EditModal toggleEditModal={toggleEditModal} deck={deck}/>}

            <Link className='btn control-button' to='/publicDecks'>Home</Link>

            <button
                className='btn loginButton control-button'
                onClick={toggleLoginModal}
            >Log In</button>

            {deckControls &&
                <Link className='btn control-button' to='/createDeck'>Create Deck</Link>
            }

            {deckControls &&
                <button
                    className='btn'
                    onClick={handleDelete}
                >Delete Deck</button>
            }

            {deckControls &&
                <button
                    className='btn'
                    onClick={toggleEditModal}
                >Edit Deck</button>
            }


        </div>
     );
}

export default ControlPanel;
