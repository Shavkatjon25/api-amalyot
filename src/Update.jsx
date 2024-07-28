import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Update = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const userId=useSelector(a=>a);
  const naviget=useNavigate();
    console.log(userId);
  async function updateUser() {
    const url = 'http://195.158.9.124:4109/auth/update';
    console.log(userId);
    const updateData = {
        _id: userId.userId,
        login,
        password,
        name
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userId.userToken}`
            },
            body: JSON.stringify(updateData)
        });

        const result = await response.json();
        console.log('Update User Response:', result);
        naviget('/')
    } catch (error) {
        console.error('Error:', error);
        setError('Xotolik yuz berdi')
    }
}



  return (
    <div>
      <h2>User up date</h2>
      <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Ism" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={updateUser}>Up date</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Update;
