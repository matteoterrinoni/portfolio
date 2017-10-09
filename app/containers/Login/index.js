/**
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { login, checkLoggedIn } from './actions';

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login({email:this.email.value, pw:this.pw.value})
  }

  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch(() => this.setState(setErrorMsg(`Email address not found.`)))
  }

  componentWillMount(){
    this.props.checkLoggedIn();
  }

  render() {
    const { user } = this.props;
    return user ? (
        <h2>{user.email}</h2>) : 
    (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => {this.email = email}} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => {this.pw = pw}} />
          </div>
          
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (info)=>dispatch(login(info)),
    checkLoggedIn: ()=>dispatch(checkLoggedIn())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
