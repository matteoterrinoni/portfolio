/**
 *
 * Photos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPhotos from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Photos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Photos</title>
          <meta name="description" content="Description of Photos" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Photos.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  photos: makeSelectPhotos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'photos', reducer });
const withSaga = injectSaga({ key: 'photos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Photos);
