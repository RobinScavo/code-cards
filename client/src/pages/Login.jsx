import {useState} from 'react';
import { Link } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';

import ControlPanel from '../components/controlPanel/ControlPanel'


function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const { name, password } = formData;

    const handleInput = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            name,
            password
        }
    }

    return (
        <section className="form-container">
            <ControlPanel />
            <section className="form-heading">
                <h1>
                    <FaSignInAlt /> Log In
                </h1>
                <p>Log in to access your decks!</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter a password'
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn">
                            Submit
                        </button>
                    </div>
                </form>

                <section className="form-heading">
                    <h1>
                        <FaSignInAlt /> Sign Up
                    </h1>
                    <p>Not a member yet? Sign up!</p>
                    <Link
                        to='/signup'
                        className="btn"
                    >Sign Up</Link>
                </section>
            </section>
        </section>
    )
}

export default Login;
