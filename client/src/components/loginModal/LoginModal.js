import React from 'react';
import { useState } from 'react';

import './loginModal.css'

const LoginModal = ({ toggleModal }) => {
    const [signupVisible, setSignupVisible] = useState(false);

    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                <button
                    id='close-modal-button'
                    className="btn"
                    onClick={toggleModal}
                >Cancel</button>
                {!signupVisible &&
                    <>
                    <form className='login-form' action="">
                        <label htmlFor="" className='login-label'>User Name</label>
                        <input type="text" className='login-input'/>
                        <label htmlFor="" className='login-label'>Password</label>
                        <input type="password" className='login-input'/>
                        <button
                            className="btn"
                        >Log In</button>
                    </form>
                    <h1>Not a member yet?</h1>
                    <button
                        className="btn"
                        onClick={() => setSignupVisible(true)}
                    >Sign Up</button>
                    </>
                }
                {signupVisible &&
                    <>
                    <form action="" className="login-form">
                    <label htmlFor="" className='login-label'>User Name</label>
                        <input type="text" className='login-input'/>
                        <label htmlFor="" className='login-label'>Password</label>
                        <input type="password" className='login-input'/>
                        <label htmlFor="" className='login-label'>Confirm Password</label>
                        <input type="password" className='login-input'/>
                        <button
                            className="btn"
                        >Register</button>
                    </form>
                    </>
                }
            </div>
        </div>
     );
}

export default LoginModal;
