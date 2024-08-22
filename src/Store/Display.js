import { createSlice } from "@reduxjs/toolkit";
const Display=createSlice({
    name:'Display',
    initialState:{submitted:false,error:false,loading:false},
    reducers:{
        submittedHandler(state){
            state.submitted=!state.submitted
        },
        errorHandler(state){
            state.error=!state.error
        },
        loadingHandler(state){
            state.loading=!state.loading
        }
    }
})
export const displayActions=Display.actions;
export default Display.reducer