import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Omborchi from './Omborchi';

const Login = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const naviget=useNavigate();
  const dispach=useDispatch();

  async function loginUser() {
    const url = 'http://195.158.9.124:4109/auth/login';
    const loginData = {
        login,
        password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        console.log('Login Response:', result);
        localStorage.setItem('token', result.token)
        dispach(Omborchi.actions.tokenNew(result.token))
        naviget('/')
    } catch (error) {
        console.error('Error:', error);
    }
}


  return (
    <div>
      <h2>Kirish</h2>
      <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginUser}>Kirish</button>
      {error && <p>{error}</p>}
      <Link to={'/register'}>Register</Link>
    </div>
  );
};

export default Login;
