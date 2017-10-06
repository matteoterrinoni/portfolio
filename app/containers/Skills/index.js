/**
 *
 * Skills
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSkills, makeSelectLocation } from './selectors';
import reducer from './reducer';
import saga from './saga';
import fileSaga from 'containers/File/saga';
import messages from './messages';
import { loadSkills, addSkill } from './actions';

import SkillsGrid from 'components/SkillsGrid';
import Skill from 'containers/Skill';

export class Skills extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadSkills();
  }

  onAddSkill() {
    this.props.addSkill({})
  }

  render() {
    const { skills, match } = this.props;
    const skillsGridProps = {
      skills,
      onAddSkill:()=>this.onAddSkill()
    }

    return (
      <div>
        <Helmet>
          <title>Skills</title>
          <meta name="description" content="Description of Skills" />
        </Helmet>
        <Switch>
          <Route exact path="/skills" render={()=><SkillsGrid {...skillsGridProps} />} />
          <Route path="/skills/:id" component={Skill} />
        </Switch>
        
      </div>
    );
  }
}

Skills.propTypes = {
  skills: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  match: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  skills: makeSelectSkills(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadSkills: (e)=>dispatch(loadSkills()),
    addSkill: (skill)=>dispatch(addSkill(skill))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'skills', reducer });
const withSaga = injectSaga({ key: 'skills', saga });
const withFileSaga = injectSaga({ key: 'file', fileSaga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Skills);
