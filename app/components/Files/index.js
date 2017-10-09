/**
*
* Files
*
*/

import React from 'react';
// import styled from 'styled-components';

import { baseKey } from 'components/Editing/model'
import './style.scss'
import File from 'containers/File/Loadable';
import { methodTypes } from 'containers/File/model';
import { clone } from 'ramda'

class Files extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	static key = baseKey + 'files';
	
	constructor(props) {
		super(props);

		this.removeFile = this.removeFile.bind(this)
	}

	removeFile(e, i) {
		e.preventDefault();
		const { value, onChange } = this.props;
		let _value = clone(value)
		_value.splice(i, 1)
		onChange(_value)
	}

	render() {
			const {
				value,
				coordinates
			} = this.props;
			return (
				<div>
					{
						value && value.map((f, i)=>{
							return (
								<div className='list-item'>
									<File key={i} file={f} method={methodTypes.listView} />
									<button onClick={(e)=>this.removeFile(e, i)} className='btn btn-default'>
										<i className='material-icons'>close</i>
									</button>
								</div>
							)
						})
					}
					<File coordinates={coordinates} method={methodTypes.upload}/>
				</div>
    		);
		}
}

Files.propTypes = {
	value: React.PropTypes.array
};

export default Files;
