import globalState from '../../store/globalState';
import * as actionTypes from '../../store/actionsTypes';

describe('Tests of globalState',()=>{
    
    test('UPDATE_USER_INFO',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_USER_INFO,
            payload:{
                uid:"123",
                displayName:"Name",
                token:"myToken"
            }            
        };
        const userInfo = { uid:"123",
                            displayName:"Name",
                            token:"myToken"};

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,userInfo})

    })

    test('UPDATE_USER_DATA',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_USER_DATA,
            payload:10           
        };
        const userData = 10;

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,userData})

    })

    test('UPDATE_ERROR_M',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_ERROR_M,
            payload:"error message"         
        };
       

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,errorM:"error message"})

    })

    test('UPDATE_LOADING',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_LOADING,
            payload:true         
        };
       

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,isloading:true})

    })

    test('UPDATE_LUNCHING',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_LUNCHING,
            payload:true         
        };
       

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,isLunching:true})

    })

    test('UPDATE_LUNCH_BREAK',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_LUNCH_BREAK,
            payload:"6:00:30pm - 6:15:00pm"         
        };
       

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,lunchBreak:"6:00:30pm - 6:15:00pm"})

    })

    test('UPDATE_ARRIVING_HOUR',()=>{
        const initialState = {};

        const action = {
            type:actionTypes.UPDATE_ARRIVING_HOUR,
            payload:"6:00pm"         
        };
       

        const state = globalState(initialState,action);

        expect( state ).toEqual({...state,arrivingHour:"6:00pm"})

    })

    test(' Default state',()=>{
        const initialState = {};

        const action = {
            type:"nothing",
                     
        };
       

        const state = globalState(initialState,action);

        expect( state ).toEqual({})

    })


})
