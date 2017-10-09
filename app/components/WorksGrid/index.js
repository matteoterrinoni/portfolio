/**
*
* WorksGrid
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import GridItems from 'components/GridItems';
import WorkItem from 'components/WorkItem';
import { worksToSortedArray } from 'containers/Works/model'
// import styled from 'styled-components';


class WorksGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	render() {
		const { works } = this.props;
		return !works ? null : (
				<GridItems>
				{
					worksToSortedArray(works).map((work)=>{
						return !work ? null : <WorkItem key={work.key} work={work}/>
					})
				}
				</GridItems>
			)
	}
}

WorksGrid.propTypes = {
	works: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool
		])
};

export default WorksGrid;
