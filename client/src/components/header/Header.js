import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/auth/authSlice';

import Logo from '../logo/Logo';
import ControlPanel from '../controlPanel/ControlPanel';

import './header.scss';

const Header = (props) => {
    const [toggleControlPanel, setToggleControlPanel] = useState(false);

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
            < ControlPanel
                {...props}
                toggleControlPanel={toggleControlPanel}
            />


            <div className="upper-header">
                <button
                    className="navigation-icon"
                    data-testid='navigation-button'
                    onClick={handleOpenControlPanel}
                ><i className="fas fa-bars"></i></button>

                {!user &&
                    <Link
                        to='/login'
                        className='login-link'
                        data-testid='login-link'
                    >~ Log In ~ ~ Sign up ~</Link>
                }

                {user &&
                    <button
                        to='/login'
                        className='login-link'
                        onClick={handleLogout}
                        data-testid='logout-link'
                    >{`~ Log out ~ ${user.name}`}</button>
                }
            </div>

            <div className="lower-header"></div>
            <Logo />
        </div>
     );
}

export default Header;
