import {logout, sign, updateArrivingHour, updateErrorM, updateIsLunching, updateLoading, updateLunchBreak, updateUserData, updateUserInfo} from '../../store/actions';
import * as actionTypes from '../../store/actionsTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';




 





describe('tests of actions.js',()=>{
    test('tests of all simple actions',()=>{
    const actionUpdateArrivingHour = updateArrivingHour("6:00pm");

    expect(actionUpdateArrivingHour).toEqual({
        type:actionTypes.UPDATE_ARRIVING_HOUR,
        payload:"6:00pm"
    })

    const actionUpdateLunchBreak = updateLunchBreak("6:00:10pm - 6:30:10pm");
    const actionUpdateIsLunching = updateIsLunching(true);
    const actionUpdateUserData = updateUserData(10);
    const actionUpdateUserInfo = updateUserInfo({uid:"123",name:"Name",token:"myToken"});
    const actionUpdateErrorM = updateErrorM("error");
    const actionUpdateLoading = updateLoading(true);

    expect(actionUpdateLunchBreak).toEqual({
        type:actionTypes.UPDATE_LUNCH_BREAK,
        payload:"6:00:10pm - 6:30:10pm"
    })
    expect(actionUpdateIsLunching).toEqual({
        type:actionTypes.UPDATE_LUNCHING,
        payload:true
    })
    expect(actionUpdateUserData).toEqual({
        type:actionTypes.UPDATE_USER_DATA,
        payload:10
    })
    expect(actionUpdateUserInfo).toEqual({
        type:actionTypes.UPDATE_USER_INFO,
        payload:{uid:"123",name:"Name",token:"myToken"}
    })

    expect(actionUpdateErrorM).toEqual({
        type:actionTypes.UPDATE_ERROR_M,
        payload:"error"
    })

    expect(actionUpdateLoading).toEqual({
        type:actionTypes.UPDATE_LOADING,
        payload:true
    })
     
    })
})

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({});


describe('tests in the actions async',()=>{
    test('must to dispatch logout action',()=>{
      store.dispatch(logout());

      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: 'UPDATE_USER_INFO', payload: '' });
      expect(actions[1]).toEqual({ type: 'UPDATE_USER_DATA', payload: '' });
      expect(actions[2]).toEqual({ type: 'UPDATE_ARRIVING_HOUR', payload: '' })
    
    })

    test('must to dispatch signin',()=>{
        const register = true;
         store.dispatch(sign("test@test.com","password",register));
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({ type: 'UPDATE_USER_INFO', payload: '' });
        expect(actions[1]).toEqual({ type: 'UPDATE_USER_DATA', payload: '' });
        expect(actions[2]).toEqual({ type: 'UPDATE_ARRIVING_HOUR', payload:expect.any(String)})
        expect(actions[3]).toEqual({ type: 'UPDATE_LOADING', payload: true })
      
      })
})