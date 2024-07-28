import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Omborchi from '../Omborchi';

function Position() {
    const token=useSelector(a=>a.token);
    const [title, setTitle]=useState('');
    const [positionAll, setPositionAll]=useState(null);
    const [position_id, setPosition_id]=useState();
    const dispach=useDispatch();

    async function addPosition(){
        const response = await fetch('http://195.158.9.124:4109/position', {
            method: position_id ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: position_id ? JSON.stringify({_id : position_id, title}) : JSON.stringify({title})
        });
        getAllPosition();
        setTitle('');
        setPosition_id(null);
    }


    async function getAllPosition() {    
        try {
            const response = await fetch('http://195.158.9.124:4109/position', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
            setPositionAll(result);
        } catch (error) {
            alert('Error');
        }
    }

    useEffect(()=>{
        getAllPosition();
    }, [])


    async function deletPosition(id) {    
        try {
            const response = await fetch(`http://195.158.9.124:4109/position/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getAllPosition();
        } catch (error) {
            alert('Error');
        }
    }

  return (
    <div className='p-10'>
        <h2>Mutaxasisligini kiriting</h2>
        <input type="text" placeholder='Hamshira' value={title} onChange={e=>setTitle(e.target.value)} className='border p-1 mt-3' />
        <button className='border py-1 px-2' onClick={addPosition}>{position_id ? 'Edit' : 'Add'}</button>
        {
            positionAll?.map(a=>{
                return <div className='flex justify-between' key={a._id}>
                    <h3>{a.title}</h3>
                    <Link to={'/hodimBriktrish'} onClick={()=>dispach(Omborchi.actions.positionIdNew(a._id))}>Hodim malumotlari</Link>
                    <button onClick={()=>{setPosition_id(a._id); setTitle(a.title)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg></button>
                    <button onClick={()=>deletPosition(a._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg></button>
 
                </div>
            })
        }
    </div>
  )
}

export default Position
