import * as actionType from './actionsTypes';


const initialState = {
    userData:localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : "",
    arrivingHour:localStorage.getItem('arrivingHour') ? JSON.parse(localStorage.getItem('arrivingHour')) : "",
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : "",    
    errorM:"",
    isloading:false,
  
    
}

const globalState = (state=initialState,action)=>{
    switch (action.type) {
       case actionType.UPDATE_USER_INFO:
           return {
               ...state,
               userInfo:action.payload
           }

       
       case actionType.UPDATE_ERROR_M:
            return {
                ...state,
                errorM:action.payload
            }   
            
        case actionType.UPDATE_LOADING:
            return {
                ...state,
                isloading:action.payload
            }   
            
        case actionType.UPDATE_LUNCHING:
            return {
                ...state,
                isLunching:action.payload
            }    

        case actionType.UPDATE_LUNCH_BREAK:
            return {
                ...state,
                lunchBreak:action.payload
            }            

        case actionType.UPDATE_USER_DATA:
            return {
                ...state,
                userData:action.payload
            }  
            
        case actionType.UPDATE_ARRIVING_HOUR:
            return {
                ...state,
                arrivingHour:action.payload
            }    

        default:
            return state
    }
}

export default globalState;