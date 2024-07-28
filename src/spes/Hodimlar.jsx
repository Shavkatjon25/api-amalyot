import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Omborchi from '../Omborchi';

function Hodimlar() {
    const token=useSelector(a=>a.token);
    const id=useSelector(a=>a.specId);
    const [hodims, setHodims]=useState(null);
    const dispach=useDispatch();

    async function getAllHodimlar() {    
        try {
            const response = await fetch(`http://195.158.9.124:4109/doctor?spec=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const result = await response.json();
            setHodims(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(()=>{getAllHodimlar()}, [])


  return (
    <div>
        <div className='grid grid-cols-7 gap-1'>
                    <h3>Name</h3>
                    <p>Education</p>
                    <p>District</p>
                    <p>Spec</p>
                    <p>Phone</p>
                    <p>History</p>
                    <p>Bemorlari</p>
                </div>
        {
            hodims?.map(a=>{
                return <div className='grid grid-cols-7 gap-1'>
                    <h3>{a.name}</h3>
                    <p>{a.education}</p>
                    <p>{a.district}</p>
                    <p>{a.spec}</p>
                    <p>{a.phone}</p>
                    <Link onClick={()=>dispach(Omborchi.actions.doctorIdNew(a._id))} to={'/historyDoctor'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg></Link>
                    <Link onClick={()=>dispach(Omborchi.actions.doctorIdNew(a._id))} to={'/patsient'}>Patsient</Link>
                </div>
            })
        }
    </div>
  )
}

export default Hodimlar
