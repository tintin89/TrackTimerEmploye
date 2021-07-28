
import NavBar from '../../components/NavBar/NavBar'
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
        errorM:"",
        loading:true
    });
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
              <NavBar/>  
            </MemoryRouter>
            
        </Provider> )

    test('Must show correctly',()=>{
     
        expect(wrapper).toMatchSnapshot();
    })
})