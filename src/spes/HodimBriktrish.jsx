import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Hodimlar from './Hodimlar';

function HodimBriktrish() {
    const [er, setEr]=useState(true)
    const [name, setName]=useState('');
    const [phone, setPhone]=useState('');
    const [region, setRegion]=useState('');
    const [district, setDistrict]=useState('');
    const [education, setEducation]=useState('');
    const [family, setFamily]=useState('');
    const [familyphone, setFamilyphone]=useState('');
    const [wortime, setWorktime]=useState('');
    const [birthday, setBirthday]=useState('');
    const department=useSelector(a=>a.departId);
    const spec=useSelector(a=>a.specId);
    const token=useSelector(a=>a.token)


    const doctor={
        name,
        phone,
        spec,
        department,
        "avatar": "",
        "gender": er ? 1 : 2,
        region,
        district,
        education,
        "family": +family,
        familyphone,
        "worktime": +wortime,
        birthday
    
    }

    async function addDoctor() {
        const response = await fetch('http://195.158.9.124:4109/doctor', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor)
        });
        const data = await response.json();
        console.log(data);
    }
  return (
        <div className='flex gap-5' >
            <div className='flex flex-1 flex-col gap-4 max-w-[400px] m-10'>
                <h4>Hodim haqida malumotlar</h4>
                <input type="text" className='border p-1' value={name} onChange={e=>setName(e.target.value)} placeholder='Falonchiyev Falonchi Falonchevich' />
                <input type="text" className='border p-1'  value={phone} onChange={e=>setPhone(e.target.value)}  placeholder='+998 (99) 123-45-67' />
                <div className='flex gap-2' onClick={()=>setEr(true)}>
                <input type="radio" checked={er} id='er'/>
                <label htmlFor="er" >Erkak</label>
                </div>
                <div className='flex gap-2' onClick={()=>setEr(false)}>
                <input type="radio" checked={!(er)} id='ayol'/>
                <label htmlFor="ayol">Ayol</label>
                </div>
                <input type="text"  value={region} onChange={e=>setRegion(e.target.value)}  className='border p-1' placeholder='Region' />
                <input type="text"  value={district} onChange={e=>setDistrict(e.target.value)}  className='border p-1' placeholder='District' />
                <input type="text"  value={education} onChange={e=>setEducation(e.target.value)}  className='border p-1' placeholder='Education' />
                <input type="number"  value={family} onChange={e=>setFamily(e.target.value)}  className='border p-1' placeholder='Family' />
                <input type="number"  value={familyphone} onChange={e=>setFamilyphone(e.target.value)}  className='border p-1' placeholder='Familyphone' />
                <input type="text"  value={wortime} onChange={e=>setWorktime(e.target.value)}  className='border p-1' placeholder='Worktime' />
                <input type="date"  value={birthday} onChange={e=>setBirthday(e.target.value)}  className='border p-1' placeholder='birthday' />
                <button className='border py-1' onClick={addDoctor}>Add</button>
            </div>

            <div>
                <Hodimlar/>
            </div>

        </div>
  )
}

export default HodimBriktrish
