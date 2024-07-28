import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Omborchi from './Omborchi';



const Home = () => {
  const token=useSelector(a=>a.token);
  const [user, setUser] = useState();
  const naviget=useNavigate()
  const dispach=useDispatch();
  console.log(user);
 
  useEffect(()=>{
    if (!(token)) {
      naviget('/register')
    }else{
      findUser(token)
    }
  }, [])


  async function findUser(token) {
    const url = 'http://195.158.9.124:4109/auth/find';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log('Find User Response:', result._id);
        setUser(result);
        dispach(Omborchi.actions.userIdNew(result._id))

    } catch (error) {
        console.error('Error:', error);
    }
}



  return (

    <div>
      {
        token ? <div className='p-10'>
           <h2>Xush kelibsiz, {user?.name}!</h2>  
            <p>Bu shifoxona boshqaruvi tizimi.</p>
            <div className='flex flex-col'>
            <Link to={'/update'}>User up date</Link>
            <Link to={'/department'}>Departmant</Link>
            </div>
            </div> : <h1>Loading...</h1>
      }
    </div>
  );
};

export default Home;



