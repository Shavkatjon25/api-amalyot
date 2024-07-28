import { configureStore } from "@reduxjs/toolkit";
import Omborchi from "./Omborchi";


const Ombor=configureStore({
    reducer:Omborchi.reducer
})

export default Ombor;