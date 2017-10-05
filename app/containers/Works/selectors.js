import { createSelector } from 'reselect';

/**
 * Direct selector to the works state domain
 */
const selectWorksDomain = (state) => state.get('works');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Works
 */

const makeSelectWorks = () => createSelector(
  selectWorksDomain,
  (substate) => {
  	return substate && substate.get('works') && substate.get('works').toJS()
  }
)

const makeSelectWork = (id) => createSelector(
  selectWorksDomain,
  (substate) => substate && substate.get('works') && substate.getIn(['works', id]).toJS()
);

export default makeSelectWorks;
export {
  selectWorksDomain,
  makeSelectWorks,
  makeSelectWork
};
