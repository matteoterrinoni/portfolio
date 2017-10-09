/**
*
* SkillsGrid
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import GridItems from 'components/GridItems';
import SkillItem from 'components/SkillItem';
import { skillsToSortedArray } from 'containers/Skills/model'
import './style.scss'
// import styled from 'styled-components';


class SkillsGrid extends React.PureComponent {
// eslint-disable-line react/prefer-stateless-function
	render() {
		const { skills, onAddSkill, user } = this.props;
		return !skills ? null : (
				<div className='skills-grid'>
					{ 
						user &&
						<button
						type='button'
						className='add-button btn btn-primary btn-sm'
						onClick={onAddSkill}>
							Add new Skill <i className='material-icons'>add</i>
						</button>
					}
					<GridItems>
					{
						skillsToSortedArray(skills).map((skill)=>{
							return !skill ? null : <SkillItem key={skill.key} skill={skill}/>
						})
					}
					</GridItems>
				</div>
			)
	}
}

SkillsGrid.propTypes = {
	skills: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool
		])
};

export default SkillsGrid;
