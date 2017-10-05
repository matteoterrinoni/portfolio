/**
*
* Code
*
*/

import React from 'react';
import { baseKey } from 'components/Editing/model';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/html';
import 'brace/theme/monokai';

import './style.scss';
// import styled from 'styled-components';


class Code extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	static key = baseKey+'code';
	render() {
		const {label, value, onChange} = this.props;
		return (
			<AceEditor
			mode="html"
			theme="monokai"
			name="code"
			onLoad={null}
			onChange={e=>onChange(e)}
			fontSize={14}
			showPrintMargin={false}
			showGutter={false}
			highlightActiveLine={true}
			value={value}
			setOptions={{
				enableBasicAutocompletion: false,
				enableLiveAutocompletion: false,
				enableSnippets: false,
				showLineNumbers: false,
				tabSize: 2
			}}/>
			);
	}
}

Code.propTypes = {

};

export default Code;
