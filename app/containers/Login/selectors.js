import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = (state) => state.get('login');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain,
  (substate) => substate.toJS()
);

const makeSelectLoading = () => createSelector(
  selectLoginDomain,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectLoginDomain,
  (substate) => substate.get('error')
);

const makeSelectUser = () => createSelector(
  selectLoginDomain,
  (substate) => substate && substate.get('user')
);

export default makeSelectLogin;
export {
  selectLoginDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectUser
};
