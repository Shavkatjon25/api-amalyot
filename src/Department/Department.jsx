import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Omborchi from '../Omborchi';

function Department() {
    const token=useSelector(a=>a.token)
    const [depart, setDepart]=useState(null);
    const [newDepart, setNewDepart]=useState('');
    const dispach=useDispatch();
    const [depart_id, setDepart_id]=useState(null);

    async function getAllDepartments() {    
        try {
            const response = await fetch('http://195.158.9.124:4109/department', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
            setDepart(result);
            console.log('Departments:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addDepartment() {


        if (newDepart=='') {
            return;
        }
    
        try {
            const response = await fetch('http://195.158.9.124:4109/department', {
                method: depart_id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: depart_id ?  JSON.stringify({_id:depart_id , title: newDepart, }) : JSON.stringify({title : newDepart})
            });
    
            const result = await response.json();
            getAllDepartments();
            setNewDepart('');
            setDepart_id(null);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addRoom(id) {
        const url = 'http://95.130.227.52:3112/room';
        const roomData = {
            department: id,
            number: '400',
            maxcount: '5'
        };
    
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
            console.log('Add Room Response:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    
    

    useEffect(()=>{
        getAllDepartments();
    }, [])



    async function deletDepart(id) {
    
        try {
            const response = await fetch(`http://195.158.9.124:4109/department/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getAllDepartments();
        } catch (error) {
            alert('Error');
        }
    }



  return (
    <div className='p-10 flex flex-col gap-2'>
      <h2>Xush kelibsiz</h2>
      <div className="flex gap-4 items-center">
        <input type="text" value={newDepart} onChange={(e)=>setNewDepart(e.target.value)}  className='border p-2'/>
        <button className='border p-2 bg-slate-400' onClick={addDepartment}>{depart_id ? 'Edit':'Add'}</button>
    </div>
    {
        depart?.map(a=>{
            return <div key={a._id} className='flex gap-2'>
                <h4>{a.title}</h4>
                <button onClick={()=>{setDepart_id(a._id); setNewDepart(a.title)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg></button>
                <button onClick={()=>deletDepart(a._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg></button>
 
                <Link to={'/roomAdd'} className='border' onClick={()=>dispach(Omborchi.actions.departIdNew(a._id))}>Add room</Link>
            </div>
        })
    }

    </div>
  )
}

export default Department
