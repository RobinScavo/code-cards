import React from 'react';

import './header.css';

const Header = ({ toggleModal }) => {

    return (
        <div className="header">
            <h1 className='title'>Code Cards</h1>
            <button
                className='btn loginButton'
                onClick={toggleModal}
            >Log In</button>
        </div>
     );
}

export default Header;
