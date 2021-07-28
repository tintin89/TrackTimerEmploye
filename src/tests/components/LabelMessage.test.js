import { shallow } from 'enzyme';
import LabelMessage from '../../components/LabelMessage/LabelMessage';



describe('test of LabelMessage.js',()=>{
  const wrapper = shallow(<LabelMessage/>)

    test('Must show correctly',()=>{
     
        expect(wrapper).toMatchSnapshot();
    })
})