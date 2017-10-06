/**
*
* InfoList
*
*/

import React from 'react';
import './style.scss';
// import styled from 'styled-components';


class InfoList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
  	const { list } = this.props;
    return (
    	<nav className="menu menu--tsula">
    	{
    		list.map(l=>{
				let label = l.label;
				let val = l.value;
				return (!val || val.length == 0) ? null : (
					<span key={label} className="menu__item">
						<span className="menu__item-name">{label}</span>
						<span className="menu__item-label">{
							val.constructor !== Array ? val :
							val.map(v=>{
								return <span key={v} className="badge badge-pill badge-primary">{v}</span>
							})
						}</span>
					</span>
				)
			})
    	}
    	</nav>
    );
  }
}

InfoList.propTypes = {
	list:React.PropTypes.array
};

export default InfoList;
