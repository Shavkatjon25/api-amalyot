import { createSlice } from "@reduxjs/toolkit";


const Omborchi=createSlice({
    name:'Omborchi',
    initialState:{
        token:localStorage.getItem('token'),
        userId:null,
        departId:null,
        specId:null,
        positionId:null,
        doctorId:null,
    },
    reducers:{
        tokenNew:(state, action)=>{
            state.token=action.payload;
        },
        userIdNew:(state, action)=>{
            state.userId=action.payload;
            console.log(action.payload);
        },
        departIdNew:(state, action)=>{
            state.departId=action.payload;
        },
        spacIdNew:(state, action)=>{
            state.specId=action.payload;
        },
        positionIdNew:(state, action)=>{
            state.positionId=action.payload;
        },
        doctorIdNew:(state, action)=>{
            state.doctorId=action.payload;
        },
    }
})

export default Omborchi;