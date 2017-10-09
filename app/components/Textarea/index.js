/**
*
* Textarea
*
*/

import React from 'react';
import { baseKey } from 'components/Editing/model';
// import styled from 'styled-components';


class Textarea extends React.PureComponent {
// eslint-disable-line react/prefer-stateless-function
  static key = baseKey + 'textarea';
  render() {
  	const { label, value, onChange } = this.props;
    return (
    	<textarea
    	className='form-control'
    	id={label}
    	placeholder={label}
    	value={value || ''}
    	onChange={onChange}
    	/>
    );
  }
}

Textarea.propTypes = {

};

export default Textarea;
