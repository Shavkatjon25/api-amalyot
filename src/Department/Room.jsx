import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Room() {
    const token =useSelector(a=>a.token);
    const depatId=useSelector(a=>a.departId)
    const [number, setNumber]=useState('');
    const [maxcount, setMaxcount]=useState('');


    async function addRoom() {
        const url = 'http://195.158.9.124:4109/room';
        const roomData = {
            department: depatId,
            number,
            maxcount,
        };
        if (number=='' || maxcount=='') {
            alert('Hatolik mavjud');
            return;
        }
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roomData)
            });
    
            const result = await response.json();
            alert("Hona qo'shildi");
            setMaxcount('');
            setNumber('');
        } catch (error) {
            console.error('Error:', error);
            alert('Iltimos qayta urining')
        }
    }
    

  return (
    <div className='flex p-10 flex-col gap-2 max-w-[500px]'>
         <Link className='border px-4' to={'/rooms'}>Rooms  </Link>
      <h3>Honalar qo'shish bo'limi</h3>
      <input type="number" placeholder='Hona raqami' className='border' value={number} onChange={(e)=>setNumber(e.target.value)} />
        <input type="number" placeholder='Odamlar soni' className='border' value={maxcount} onChange={(e)=>setMaxcount(e.target.value)} />
        <button className='border' onClick={addRoom}>Add room</button>
    </div>
  )
}

export default Room
