import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { baseKey } from 'components/Editing/model';
configure({ adapter: new Adapter() });

import Code from '../';

describe('<Code />', () => {

	it('should render the proper HTML of Code', () => {
		const wrapper = render(
			<Code value="###" onChange={()=>null}/>
		);
		expect(toJson(wrapper)).toMatchSnapshot()
	});

	it('should have a value for ReactAce attribute', () => {
		const renderedComponent = mount(<Code value="###" onChange={()=>null}/>);
		expect(renderedComponent.find('ReactAce').prop('value')).toBe('###');
	});

	it('should have a static prop baseKey_code', () => {
		const expectedKey = baseKey+'code';
		expect(Code.key).toBe(expectedKey);
	});

});