import { createSlice } from "@reduxjs/toolkit";
import { url } from "inspector";

const initialState = {
    stepOneData:{
        name:'',
        jobRole:'',

      
    },
    stepTwoData:{
       useUrl:true,
        url:'',description:''},
        stepThreeData:{
            questionCount:5,
            duration:100
        },
        
    
};
const formSlice=createSlice({
    name:'multiStepForm',
    initialState,
    reducers:{
        setStepOneData:(state,action)=>{
            state.stepOneData=action.payload
        },
        setStepTwoData:(state,action)=>{
            state.stepTwoData=action.payload
        },
        setStepThreeData:(state,action)=>{
            state.stepThreeData=action.payload
        }
    }
})
export const {setStepOneData,setStepTwoData,setStepThreeData}=formSlice.actions
export default formSlice.reducer