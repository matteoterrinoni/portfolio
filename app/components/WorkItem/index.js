/**
*
* WorkItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// import styled from 'styled-components';

import './style.scss';
import { sections } from 'containers/App/sections';
import { shallowProperties } from 'containers/Works/model';
import InfoList from 'components/InfoList'

class WorkItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	
	componentDidMount() {
		// const items = Array.from(document.querySelectorAll('.menu > .menu__item'));
		// items.forEach(item => new Item(item));
	}

	render() {
		const { work } = this.props;
		return !work ? null : (
			<div className='work-grid-item'>
			<Link className='grid-item-wrapper' to={{pathname: `${sections.works.path}/${work.key}` }}>
				<InfoList list={
					Object.keys(shallowProperties).map(key=>({
						label:shallowProperties[key].label,
						value:work[shallowProperties[key].id]
					}))
				}/>
			</Link>
			</div>
			);
	}
}

WorkItem.propTypes = {
	work: PropTypes.object
};

export default WorkItem;
