import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ loggedIn, toggleModal }) => {

    return (
        <div className="header">
            <h1 className='title'>Code Cards</h1>
            <Link id='home-button' className='btn' to='/publicDecks'>Home</Link>
            <button
                className='btn loginButton'
                onClick={toggleModal}
            >Log In</button>
            <Link id='create-button' className='btn loginButton' to='/createDeck'>Create Deck</Link>
        </div>
     );
}

export default Header;
