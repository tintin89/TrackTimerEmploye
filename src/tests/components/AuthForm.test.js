import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import {sign} from '../../store/actions';


jest.mock('../../store/actions',()=>({
    sign:jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);



describe('test in AuthForm',()=>{
    const store = mockStore({
        userinfo:"",
        errorM:"",
        loading:true
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
          <AuthForm/>  
        </MemoryRouter>
        
    </Provider> )

  test('must show correctly',()=>{
      expect(wrapper).toMatchSnapshot();
  })

  test('must call handlesubmit',()=>{
    
     wrapper.find('#email').simulate('change',{target:{value:"test@test.com"}});
     wrapper.find('#password').simulate('change',{target:{value:"test"}});

      wrapper.find('form').prop('onSubmit')(
          {preventDefault(){}}
      );
      expect(sign).toHaveBeenCalled();
  })
})