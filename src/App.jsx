import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Update from './Update';
import Department from './Department/Department';
import Room from './Department/Room';
import Rooms from './Room/Rooms';
import Spes from './spes/Spes';
import HodimBriktrish from './spes/HodimBriktrish';
import Position from './spes/Position';
import HistoryDoctor from './spes/HistoryDoctor';
import Patsient from './patsient/Patsient';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/update",
    element: <Update/>,
  },
  {
    path: "/department",
    element: <Department/>,
  },
  {
    path: "/roomAdd",
    element: <Room/>,
  },
  {
    path: "/rooms",
    element: <Rooms/>,
  },
  {
    path: "/spes",
    element: <Spes/>,
  },
  {
    path: "/hodimBriktrish",
    element: <HodimBriktrish/>,
  },
  {
    path: "/position",
    element: <Position/>,
  },
  {
    path: "/historyDoctor",
    element: <HistoryDoctor/>,
  },
  {
    path: "/patsient",
    element: <Patsient/>,
  },
]);

const App = () => {


  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
