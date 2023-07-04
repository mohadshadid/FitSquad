import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!emailAddress || !password) {
            setErrorMessage('Please enter both email address and password');
            return;
        }

        axios
            .post('http://localhost:8000/api/login', { emailAddress, password })
            .then((response) => {
                console.log(response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error(error.response.data);
                setErrorMessage(error.response.data.message);
            })
    }

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email Address:</label>
                    <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;