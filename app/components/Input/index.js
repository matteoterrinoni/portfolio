/**
*
* Input
*
*/

import React from 'react';
import { baseKey } from 'components/Editing/model';
// import styled from 'styled-components';


class Input extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	static key= `${baseKey}input`;

	render() {
		const { label, value, onChange } = this.props;

		return (
			<input
				type="text"
				className="form-control"
				id={label}
				placeholder={label}
				value={value || ''}
				onChange={e=>onChange(e.target.value)}
			/>
		);
	}
}

Input.propTypes = {

};

export default Input;
