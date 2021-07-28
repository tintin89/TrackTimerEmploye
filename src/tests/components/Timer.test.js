import Timer,{handleLunch} from '../../components/Timer/Timer'
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);



describe('test in Employes.js',()=>{
    const store = mockStore({
        userinfo:"",
        userData:"",
        
    });
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
              <Timer/>  
            </MemoryRouter>
            
        </Provider> )

    test('Must show correctly',()=>{
     
        expect(wrapper).toMatchSnapshot();
    })

   
})