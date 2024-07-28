import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function HistoryDoctor() {

    const [title, setTile]=useState('');
    const [startData, setStartData]=useState();
    const [endData, setEndData]=useState();
    const token=useSelector(a=>a.token);
    const doctor=useSelector(a=>a.doctorId);
    const position=useSelector(a=>a.positionId);
    const [allHistory, setAllHistory]=useState(null);

    async function addHistory() {
        
        try {
            const response = await fetch('http://195.158.9.124:4109/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({doctor, position, title, startData, endData})
            });
    
            const result = await response.json();
            console.log(result);
        } catch (error) {
            alert('Iltimos qayta urining')
        }
    }

    useEffect(()=>{
        getAllHistory();
    }, [])

   async function getAllHistory(){
    const response = await fetch(`http://195.158.9.124:4109/history/${doctor}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const result = await response.json();
    setAllHistory(result)
   }






  return (
    <div className='flex gap-2'>
            <div className='p-10 flex flex-col gap-2 max-w-[500px]'>
        <h4>Doctor tarihi</h4>
        <input type="text"  value={title} onChange={e=>setTile(e.target.value)} className='border p-1' placeholder='Title => Yuqumli kasalliklar shifonasi' />
        <input type="date"   onChange={e=>setStartData(e.target.value)}  className='border p-1'/>
        <input type="date"    onChange={e=>setEndData(e.target.value)}  className='border p-1' />
        <button className='border p-1' onClick={addHistory}>Add</button>
    </div>
    <div>
        <h2>Doctor ishlagan yo'nalishlari</h2>
        <ul className='list-decimal'>
        {
        allHistory?.map(a=>{
            return <li>{a.title }</li>
        })
    }
        </ul>
    </div>
    </div>
  )
}

export default HistoryDoctor
