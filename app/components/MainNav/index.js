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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import messages from './messages';
import './style.scss'

import { sections } from 'containers/App/sections';

class MainNav extends React.Component { // eslint-disable-line react/prefer-stateless-function

	matchPath(sectionMatches) {
		const { location } = this.props;
		let i = 0;
		let match = false
		while(i<sectionMatches.length && !match){
			match = matchPath(location.pathname, sectionMatches[i])
			i++
		}
		return match
	}

	render() {
		const { match, location, history } = this.props;

		return (
			<nav className="menu menu--alonso main-nav col-xs-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
				<ReactCSSTransitionGroup
					transitionName="fade-left"
					transitionAppear={true}
					transitionEnterTimeout={1000}
					transitionAppearTimeout={1000}
					transitionLeaveTimeout={1000}>
					{
						Object.keys(sections).map(s=>{
								let section = sections[s];
								const newPath = {
										exact:true,
										path: section.path+'/:id',
										strict: false,
									};
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
				</ReactCSSTransitionGroup>

				<ul className="menu__list">
					{
						Object.keys(sections).map(s=>{
							let section = sections[s];
							return (
								<li key={s} className={`menu__item ${ this.matchPath(section.matchPath)?'menu__item--current':''}`}>
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
