/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

 import React from 'react'
 import { connect } from 'react-redux'
 import { Switch, Route } from 'react-router-dom'
 import { Helmet } from 'react-helmet'
 import { createStructuredSelector } from 'reselect';

 import HomePage from 'containers/HomePage/Loadable'
 import Skills from 'containers/Skills/Loadable'
 import Works from 'containers/Works/Loadable'
 import Login from 'containers/Login/Loadable'
 import NotFoundPage from 'containers/NotFoundPage/Loadable'
 import SideMenu from 'components/SideMenu'
 import MorphBackground from 'components/MorphBackground'
 import MainNav from 'components/MainNav'
 import {sections} from './sections'
 import saga from 'containers/File/saga'
 import { compose } from 'redux';
 import injectSaga from 'utils/injectSaga';
 import { makeSelectSidemenu } from './selectors';
 
 import './style.scss';

 class App extends React.Component {
 		constructor(props) {
 			super(props);
 			this.state = {
 				sidemenu: false
 			}
 		}
 		render(){
		const { sidemenu } = this.state;
	 	return (
	 		<div className={`sidemenu-${sidemenu?'open':'closed'}`}>
		 		<Helmet
		 		titleTemplate="%s - Matteo's porfolio"
		 		defaultTitle="Matteo's porfolio">
		 		<meta name="description" content="A React.js Boilerplate application" />
		 		</Helmet>
		 		<MorphBackground />
		 		<div className="container-fluid">
			 		<div className="row justify-content-end">
			 			<SideMenu onToggleSidemenu={()=>this.setState({sidemenu: !sidemenu})}/>
			 			<div className="col-xs-12 col-sm-12 col-md-8 col-lg-7 col-xl-6 main-content">
			 				<MainNav/>
			 				<article>
				 				<Switch>
					 				<Route exact path='/' component={Works} />
					 				<Route path={sections.works.path} component={Works} />
					 				<Route path={sections.skills.path} component={Skills} />
					 				<Route exact path={'/admin'} component={Login} />
					 				<Route component={NotFoundPage} />
				 				</Switch>
					 		</article>
				 		</div>
			 		</div>
		 		</div>
	 		</div>
	 		);
	 }
 }

const withSaga = injectSaga({ key: 'file', saga });


export default compose(
  	withSaga
)(App);
