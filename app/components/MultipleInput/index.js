/**
*
* Input
*
*/

import React from 'react';
import { baseKey } from 'components/Editing/model';
import Input from 'components/Input';
import { clone } from 'ramda';
import './style.scss';
// import styled from 'styled-components';


class MultipleInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	static key= `${baseKey}multipleinput`;

	constructor(props) {
		super(props);
		this.state = {
			newVal: ''
		}

		this.onAdd = this.onAdd.bind(this);
	}

	onChange(vi, val) {
		const _value = clone(this.props.value);
		_value[vi] = val;
		this.props.onChange(_value)
	}

	onRemove(e, vi) {
		e.preventDefault();
		const _value = clone(this.props.value);
		_value.splice(vi, 1);
		this.props.onChange(_value);
	}

	onAdd(e) {
		e.preventDefault();
		let _value = clone(this.props.value);
		if(!_value){
			_value = [];
		}
		_value.push(this.state.newVal);
		this.setState({newVal:''}, ()=>{
			this.props.onChange(_value);
		})
	}

	render() {
		const { label, value, onChange } = this.props;
		const { newVal } = this.state;

		return (
			<div className="input-list">
				{
					value && value.map((v, vi)=>{
						return (
							<div className="input-list-item">
								<Input label={`${label}-${vi}`} value={v} onChange={val=>this.onChange(vi, val)} />
								<button onClick={(e)=>this.onRemove(e, vi)} type="button" className="btn btn-sm btn-primary"><i className="material-icons">close</i></button>
							</div>
						)
					})
				}
				<div className="input-list-item">
					<Input label={`${label}-new`} value={newVal} onChange={val=>this.setState({newVal:val})} />
					<button onClick={(e)=>this.onAdd(e)} type="button" className="btn btn-sm btn-success"><i className="material-icons">add</i></button>
				</div>
			</div>
		);
	}
}

MultipleInput.propTypes = {

};

export default MultipleInput;
