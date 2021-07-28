import { shallow } from 'enzyme';

import Employes from '../../components/Employers/Employers'


describe('test in Employes.js',()=>{
  const wrapper = shallow(<Employes/>)

    test('Must show correctly',()=>{
     
        expect(wrapper).toMatchSnapshot();
    })
})