/**
*
* MainNav
*
*/

import React from 'react';
import PropTypes from 'prop-types'
// import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { matchPath } from 'react-router';
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl';
import {merge} from 'ramda'

import messages from './messages';
import './style.scss'

import { sections } from 'containers/App/sections';

class MainNav extends React.Component { // eslint-disable-line react/prefer-stateless-function

	render() {
		const { match, location, history } = this.props;

		return (
			<nav className="menu menu--alonso main-nav">
				{
					Object.keys(sections).map(s=>{
							let section = sections[s];
							const newPath = merge(section.matchPath, {
									exact:true,
									path: section.matchPath.path+'/:id'
								});
							const match = matchPath(location.pathname, newPath);

							return !match ? null :
							(
								<li key={s} className={`menu__item back`}>
									<Link className="menu__link" to={{
										pathname: section.path
										}}><i className="material-icons">arrow_back</i> <FormattedMessage {...messages.back} />
									</Link>
								</li>
							)	
						})
				}
				<ul className="menu__list">
					{
						Object.keys(sections).map(s=>{
							let section = sections[s];
							return (
								<li key={s} className={`menu__item ${ matchPath(location.pathname, section.matchPath)?'menu__item--current':''}`}>
									<Link className="menu__link" to={{
										pathname: section.path
										}}><FormattedMessage {...messages[s]} />
									</Link>
								</li>
							)	
						})
					}
					<li className="menu__line"></li>
				</ul>
			</nav>
			);
	}
}

MainNav.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(MainNav);
