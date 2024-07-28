import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const naviget=useNavigate();

  async function registerUser() {
    const url = 'http://195.158.9.124:4109/auth/reg';
    const userData = {
        login,
        password,
        name,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        naviget('/login')
    } catch (error) {
        console.error('Error:', error);
        setError('Xotolik yuz berdi')
    }
}


  return (
    <div>
      <h2>Ro'yxatdan o'tish</h2>
      <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Ism" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={registerUser}>Ro'yxatdan o'tish</button>
      {error && <p>{error}</p>}
      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default Register;
