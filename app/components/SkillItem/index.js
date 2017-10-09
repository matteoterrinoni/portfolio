/**
*
* SkillItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// import styled from 'styled-components';

import './style.scss';
import { sections } from 'containers/App/sections';
import { shallowProperties } from 'containers/Skills/model';
import InfoList from 'components/InfoList'

class SkillItem extends React.PureComponent {
// eslint-disable-line react/prefer-stateless-function

	render() {
		const { skill } = this.props;
		return !skill ? null : (
			<div className='skill-grid-item'>
				<Link className='grid-item-wrapper'
				to={{pathname: `${sections.skills.path}/${skill.key}` }}>
					<h3>{skill.title}</h3>
					<InfoList list={
						Object.keys(shallowProperties).map(key=>({
							label:shallowProperties[key].label,
							value:skill[shallowProperties[key].id]
						}))
					}/>
				</Link>
			</div>
			);
	}
}

SkillItem.propTypes = {
	skill: PropTypes.object
};

export default SkillItem;
