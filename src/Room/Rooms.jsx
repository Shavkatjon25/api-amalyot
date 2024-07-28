import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Rooms() {
    const [roms, setRoms]=useState(null);
    const token =useSelector(a=>a.token)
    const departID =useSelector(a=>a.departId)

    async function getAllRooms() {    
        try {
            const response = await fetch(`http://195.158.9.124:4109/room?department=${departID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
            setRoms(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(()=>{getAllRooms()}, [])


    async function deleteRoom(roomId) {   
    
            const response = await fetch(`http://195.158.9.124:4109/room/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
            console.log('Delete Room Response:', result);
            getAllRooms();      
        
    }    
    


  return (
    <div className='p-10'>
        <h2>Honalar</h2>
        <div className='grid grid-cols-5  gap-4'>
                        <h3>Hona nomi</h3>
                        <p>Hona raqami</p>
                        <p>Odamlar soni</p>
                        <p>Doktorlar</p>
                        <p>Delete</p>
                </div>
        {
            roms?.map(a=>{
                console.log(a);
                return <div key={a._id} className='grid justify-center grid-cols-5 gap-1'>
                        <h3>{a.department}</h3>
                        <p>{a.number}</p>
                        <p>{a.maxcount}</p>
                        <Link to={'/spes'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM14 10H10C9.44772 10 9 10.4477 9 11V15H10.5V19H13.5V15H15V11C15 10.4477 14.5523 10 14 10ZM12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5Z"></path></svg></Link>
                        <button onClick={()=>deleteRoom(a._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg></button>

                </div>
            })
        }
    </div>
  )
}

export default Rooms
