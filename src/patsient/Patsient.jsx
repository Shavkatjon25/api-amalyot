import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Patsient() {
    const [name, setName]=useState('');
    const [arriveDate, setArriveDate]=useState('');
    const [diagnos, setDiagnos]=useState('');
    const [phone, setPhone]=useState('');
    const [region, setRegion]=useState('');
    const department=useSelector(a=>a.departId);
    const doctor=useSelector(a=>a.doctorId);
    const [district, setDiscrict]=useState('');
    const token=useSelector(a=>a.token);
    const [allPat, setAllPat]=useState(null);




    const patientData = {
        name,
        department,
        doctor,
        arriveDate,
        diagnos,
        birthday: "2003-06-10T10:25:50.254Z",
        phone,
        gender: "1",
        married: "2",
        region,
        district,
        education: "Oliy",
        employment: "1",
        workplace: "Yaxshi joyda",
        familyphone: "+998 (71) 234-89-89",
        bloodtype: "2",
        factor: "+",
        policy: "№1231123-AB",
        policecompany: "MCHJ “Human Save Limited",
        privilege: "Order sohibi",
        privilegeDoc: "№ 123123-A Kategoriya A",
        privilegeDate: "2022-06-10T10:25:50.254Z",
        invalid: "1",
        weight: "62",
        height: "172",
        reactions: "Kop savollarga"
    };


    async function postPatient() {
        const formData = new FormData();
        for (const key in patientData) {
            formData.append(key, patientData[key]);
        }
        console.log('x');
        try{

            const response = await fetch('http://195.158.9.124:4109/patsient', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            console.log(response);
        }catch (eror){
            console.log(eror);
        }
    }



    async function getAllPatients() {
        const response = await fetch(`http://195.158.9.124:4109/patsient?doctor=${doctor}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const result= await response.json();
        console.log(result);
        setAllPat(result);
    }

    useEffect(()=>{getAllPatients()}, [])

  return (
    <div className='flex gap-5  p-10 '>
        <div className='flex flex-1 flex-col gap-5 max-w-[500px]'>
        <h2>Patsient</h2>
        <input type="text" className='border p-1' placeholder='name' value={name} onChange={e=>setName(e.target.value)}/>
        <input type="text" className='border p-1' placeholder='Arrive date => 09-09-2005' value={arriveDate} onChange={e=>setArriveDate(e.target.value)}/>
        <input type="text" className='border p-1' placeholder='Diagnos' value={diagnos} onChange={e=>setDiagnos(e.target.value)}/>
        <input type="text" className='border p-1' placeholder='Phone' value={phone} onChange={e=>setPhone(e.target.value)}/>
        <input type="text" className='border p-1' placeholder='Region' value={region} onChange={e=>setRegion(e.target.value)}/>
        <input type="text" className='border p-1' placeholder='District' value={district} onChange={e=>setDiscrict(e.target.value)}/>

        <button onClick={postPatient}>Add</button>
        </div>

     <div cl>
     <div className='flex gap-10'>
                        <h3>Patsient</h3>
                        <p>Diagnos</p>
                         <p>Department</p>
                          <p>Doctor</p>
                </div>
        {
            allPat?.map(x=>{
                return <div className='flex gap-10'>
                        <h3>{x.name}</h3>
                        <p>{x.diagnos}</p>
                         <p>{x.department}</p>
                          <p>{x.doctor}</p>
                </div>
            })
        }
    </div>
    
    </div>
  )
}

export default Patsient
