import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

import Logo from '../logo/Logo'

import './header.scss';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/decks')
    }

    return (
        <div className="header-container">
            <div className="upper-header">
                <button className="navigation-icon"><i class="fas fa-bars"></i></button>
                {!user &&
                    <Link
                        to='/login'
                        className='login-link'
                    >Log In or Sign up</Link>
                }
                {user &&
                    <button
                        to='/login'
                        className='login-link'
                        onClick={handleLogout}
                    >{`Log out ${user.name}`}</button>
                }
            </div>

            <div className="lower-header"></div>
            <Logo />
        </div>
     );
}

export default Header;
