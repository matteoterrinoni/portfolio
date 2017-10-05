/**
 *
 * Works
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
import { makeSelectWorks, makeSelectLocation } from './selectors';
import reducer from './reducer';
import saga from './saga';
import fileSaga from 'containers/File/saga';
import messages from './messages';
import { loadWorks } from './actions';

import Work from 'containers/Work';
import WorksGrid from 'components/WorksGrid';

export class Works extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadWorks();
  }

  render() {
    const { works, match } = this.props;
    const worksGridProps = {
      works
    }

    return (
      <div>
        <Helmet>
          <title>Works</title>
          <meta name="description" content="Description of Works" />
        </Helmet>
        <Switch>
          <Route exact path="/" render={()=><WorksGrid {...worksGridProps} />} />
          <Route exact path="/works" render={()=><WorksGrid {...worksGridProps} />} />
          <Route path="/works/:id" component={Work} />
        </Switch>
        
      </div>
    );
  }
}

Works.propTypes = {
  works: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  match: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  works: makeSelectWorks()
});

function mapDispatchToProps(dispatch) {
  return {
    loadWorks: (e)=>dispatch(loadWorks())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'works', reducer });
const withSaga = injectSaga({ key: 'works', saga });
const withFileSaga = injectSaga({ key: 'file', fileSaga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Works);