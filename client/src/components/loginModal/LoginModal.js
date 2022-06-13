// import React from 'react';
// import { useState, } from 'react';
// import { useNavigate } from 'react-router-dom';


// import './loginModal.css'


// const LoginModal = ({ toggleLoginModal }) => {
//     const [signupVisible, setSignupVisible] = useState(false);
//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();



//     const handleLogin = (e) => {
//         e.preventDefault();
//         const user = { userName, password };

//         fetch('http://localhost:3000/login')
//     }

//     const handleSignup = (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {alert('Passwords must match')}

//         const user = { userName, password };

//         fetch('http://localhost:3003/signup', {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(user)
//         }).then(() => {
//             navigate('/privateDecks')
//         })
//     }

//     return (
//         <div className="login-modal-overlay">
//             <div className="login-modal">
//                 <button
//                     id='close-modal-button'
//                     className="btn"
//                     onClick={toggleLoginModal}
//                 >Cancel</button>
//                 {!signupVisible &&
//                     <>
//                     <form className='login-form' action="">
//                         <label className='login-label'>User Name</label>
//                         <input
//                             type="text"
//                             className='login-input'
//                             onChange={(e) => setUserName(e.target.value)}
//                             required
//                         />

//                         <label className='login-label'>Password</label>
//                         <input
//                             type="password"
//                             className='login-input'
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />

//                         <button
//                             id='login-button'
//                             className="btn"
//                             onClick={handleLogin}
//                         >Log In</button>
//                     </form>

//                     <h1>Not a member yet?</h1>
//                     <button
//                         className="btn"
//                         onClick={() => setSignupVisible(true)}
//                     >Sign Up</button>
//                     </>
//                 }

//                 {signupVisible &&
//                     <form className="login-form">
//                         <label htmlFor="" className='login-label'>User Name</label>
//                         <input
//                             type="text"
//                             className='login-input'
//                             onChange={(e) => setUserName(e.target.value)}
//                             required
//                         />

//                         <label htmlFor="" className='login-label'>Password</label>
//                         <input
//                             type="password"
//                             className='login-input'
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />

//                         <label htmlFor="" className='login-label'>Confirm Password</label>
//                         <input
//                             type="password"
//                             className='login-input'
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                         />

//                         <button
//                             id='register-button'
//                             className="btn"
//                             onClick={handleSignup}
//                         >Register</button>
//                     </form>
//                 }
//             </div>
//         </div>
//      );
// }

// export default LoginModal;
