import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import styled from 'styled-components';
const LoginFormContainer = styled.div`
display: grid;
grid-template-columns: 1fr minmax(200px, 400px) 1fr;
grid-template-rows: 1fr minmax(auto, 1fr) 1fr;
grid-gap: 10px;
width: 100%;
height: 100vh;
background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
background-size: 400% 400%;
animation: Gradient 15s ease infinite;
box-sizing: border-box;
`;

const StyledForm = styled.form`
grid-column: 2;
grid-row: 2;
display: grid;
grid-gap: 10px;
margin: auto 0;
padding: 20px;
background-color: rgba(255, 255, 255, 0.9);
border-radius: 10px;
box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button`
padding: 10px;
border: 1px solid rgba(0, 0, 0, 0);
border-radius: 5px;
background: #fff;
width: 360px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

&:hover {
    background-color: #eef;
    border: 1px solid #aaf;
}
`;

const StyledInput = styled.input`
padding: 5px;
margin: 10px;
border: 1px solid #ddd;
border-radius: 5px;
&:hover {
    border: 1px solid #aaf;
}
`;

const StyledSection = styled.section`
margin: 0;
padding: 20px;
background-color: #fff;
border: none;
border-radius: 5px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;


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
        <LoginFormContainer>
            <StyledForm onSubmit={handleLogin}>
                <h2>Welcome Back!</h2>
                <StyledSection>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <label>Email Address</label>
                        <StyledInput
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        // required
                        />
                    </div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <label>Password</label>
                        <StyledInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        // required
                        />
                    </div>
                </StyledSection>
                <div>
                    <StyledButton type="submit">Login</StyledButton>
                </div>
            </StyledForm>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </LoginFormContainer>
    )
}

export default Login;