import * as actionTypes from './actionsTypes';
import axios from 'axios';
import { apiKey } from '../firebase';
import moment from 'moment';




export const updateArrivingHour = (hour)=>{
    return {
        type:actionTypes.UPDATE_ARRIVING_HOUR,
        payload:hour
    }
}

export const updateLunchBreak = (dataLB)=>{
    return {
        type:actionTypes.UPDATE_LUNCH_BREAK,
        payload:dataLB
    }
}

export const updateIsLunching = (lunching) =>{
    return {
        type:actionTypes.UPDATE_LUNCHING,
        payload:lunching
    }
}

export const updateUserData = (data) =>{
    return {
        type:actionTypes.UPDATE_USER_DATA,
        payload:data
    }
}
export const updateUserInfo=(info)=>{
    return {
        type:actionTypes.UPDATE_USER_INFO,
        payload:info
    }
}

export const updateErrorM = (m) =>{
    return {
        type:actionTypes.UPDATE_ERROR_M,
        payload:m
    }
}


export const updateLoading = (loading) =>{
    return {
        type:actionTypes.UPDATE_LOADING,
        payload:loading
    }
}

export const sign = (email,password,register)=>{
    return dispatch => {
        dispatch(updateLoading(true));
        if(register){           
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
            {email:email,password:password,returnSecureToken:true})
            .then(async response=>{
               
                dispatch(updateUserInfo(response.data));
                  localStorage.setItem("userInfo",JSON.stringify(response.data)); 
              try{
                  const date = moment();
              await axios.put(`https://timertracker-a17c6-default-rtdb.firebaseio.com/employers/${response.data.localId}.json`,
                {
                    email:response.data.email,
                   [date.format("MMM Do YY")]:{                   
                    arrivingHour:date.format('LT'),
                    exitingHour:"",
                    workedHours:0,
                    lunchBreaks:[]
                   }
                })  
                dispatch(updateLoading(false));     
                dispatch(updateArrivingHour(date.format('LT')));
              }   
              catch(error){
                  console.log("errorDB",error);
              }           
            })
            .catch(error=>{
                dispatch(updateErrorM(error.response.data.error.message));
               dispatch(updateLoading(false));
            })
        }else{            
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {email:email,password:password,returnSecureToken:true})
            .then(async response=>{                
                dispatch(updateUserInfo(response.data));
                localStorage.setItem("userInfo",JSON.stringify(response.data));
                try {
               const data = await axios.get(`https://timertracker-a17c6-default-rtdb.firebaseio.com/employers/${response.data.localId}.json`);
               if(data.data[moment().format("MMM Do YY")]===undefined){               
                localStorage.setItem("arrivingHour",moment().format('LT'));
                dispatch(updateArrivingHour(moment().format('LT')));
               }else{
                dispatch(updateArrivingHour(data.data[moment().format("MMM Do YY")].arrivingHour));
               }
                dispatch(updateUserData(data.data[moment().format("MMM Do YY")].workedHours));
                
                localStorage.setItem("existCounter",true);
               
               

                } catch (error) {
                    
                }
                dispatch(updateLoading(false));
            })
            .catch(error=>{
                dispatch(updateErrorM(error.response.data.error.message));
                dispatch(updateLoading(false));
            })
        }
    }
}

export const logout = ()=>{
    return dispatch=>{
        localStorage.clear();
        dispatch(updateUserInfo(""));
        dispatch(updateUserData(""));
        dispatch(updateArrivingHour(""));
        
        
    }
}


