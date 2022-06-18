import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../../redux/auth/authSlice';

import ControlPanel from '../../components/controlPanel/ControlPanel';
import Spinner from '../../components/spinner/Spinner';

import './register.scss';


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    })

    const { name, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/decks/privateDecks')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleInput = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords must match.')
        } else  {
            const userData = { name, password }
            dispatch(register(userData))
        }

    }

    if (isLoading) {
        return <Spinner />
    }


        return (
            <>
            <section className='form-container'>
                <ControlPanel />
                <section className="form-heading">
                    <h1>
                        < FaUser /> Sign Up
                    </h1>
                    <p>Sign up to create and save decks!</p>
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
                            <input
                                type="password"
                                className='form-control'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder='Confirm password'
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form-group">
                            <button type='submit' className="btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            </section>
            </>
    )
}

export default Register
