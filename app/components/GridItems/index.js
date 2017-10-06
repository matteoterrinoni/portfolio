/**
*
* GridItems
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import MasonryLayout from 'react-masonry-layout'
// import styled from 'styled-components';
import './style.scss';

class GridItems extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const {children} = this.props;
		return (!children || children.length == 0) ? null:(
			<MasonryLayout
				id="items"
				infiniteScrollDisabled={true}
				infiniteScroll={()=>false}
				sizes={
					[ 
						{
							columns: 1,
							gutter: 20
						},
						{ mq: '540px', columns: 1, gutter: 20},
						{ mq: '720px', columns: 2, gutter: 20 },
						{ mq: '870px', columns: 2, gutter: 20 },
						{ mq: '1115px', columns: 2, gutter: 20 }
					]}
				>
				{children}
			</MasonryLayout>
			);
	}
}

GridItems.propTypes = {
};

export default GridItems;
