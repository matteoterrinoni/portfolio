import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { baseKey } from 'components/Editing/model';
configure({ adapter: new Adapter() });

import Input from '../';

describe('<Input />', () => {

	it('should render the proper HTML of Input', () => {
		const wrapper = render(
			<Input label="label" value={undefined} onChange={()=>null}/>
		);
		expect(toJson(wrapper)).toMatchSnapshot()
	});

	it('should render an empty string value when passed value is undefined', () => {
		const wrapper = render(
			<Input label="label" value={undefined} onChange={()=>null}/>
		);
		expect(wrapper.attr('value')).toBe('');
	});

	it('should have a static prop baseKey_input', () => {
		const expectedKey = baseKey+'input';
		expect(Input.key).toBe(expectedKey);
	});

});