import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/auth/authSlice';

import Logo from '../logo/Logo';
import ControlPanel from '../controlPanel/ControlPanel';
import { ImEnter } from 'react-icons/im'

import './header.scss';

const Header = (props) => {
    const [toggleControlPanel, setToggleControlPanel] = useState(false);
    const rotated = toggleControlPanel ? 'rotated' : '';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/decks')
    }

    const handleOpenControlPanel = () => {
        setToggleControlPanel(!toggleControlPanel)
    }

    return (
        <div className="header-container" data-testid='header-container'>
            <div className="upper-header">
                <button
                    className={`navigation-icon ${rotated}`}
                    data-testid='navigation-button'
                    onClick={handleOpenControlPanel}
                ><i className="fas fa-bars"></i></button>

                {!user &&
                    <Link
                        to='/login'
                        className='login-link'
                        data-testid='login-link'
                    >
                        <div className="icon-container">
                            < ImEnter className='my-icon'/>
                        </div>
                        <h2 className="login-text">Log In</h2>

                    </Link>
                }

                {user &&
                    <button
                        className="login-link"
                        onClick={handleLogout}
                        data-testid='logout-link'
                    >
                        <h2 className="logout-name">{`${user.name}`}</h2>
                        <h2 className="login-text">{`Log out`}</h2>
                    </button>
                    // <div className='login-link'>
                    //     <button
                    //         className='login-text'
                    //         onClick={handleLogout}
                    //         data-testid='logout-link'
                    //     >{`Log out`}</button>
                    // </div>
                }
            </div>

            <div className="lower-header"></div>
            <Logo />
            < ControlPanel
                {...props}
                toggleControlPanel={toggleControlPanel}
            />
        </div>
     );
}

export default Header;
