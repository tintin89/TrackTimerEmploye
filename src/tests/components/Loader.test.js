import { shallow } from 'enzyme';
import React from 'react';
import Loader from '../../components/Loader/Loader'


describe('test of Loader.js',()=>{
  const wrapper = shallow(<Loader/>)

    test('Must show correctly',()=>{
     
        expect(wrapper).toMatchSnapshot();
    })
})