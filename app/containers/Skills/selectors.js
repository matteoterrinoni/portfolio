import { createSelector } from 'reselect';

/**
 * Direct selector to the skills state domain
 */
const selectSkillsDomain = (state) => state && state.get('skills');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Skills
 */

const makeSelectSkills = () => createSelector(
  selectSkillsDomain,
  (substate) => substate && substate.get('skills') && substate.get('skills').toJS()
);

const makeSelectSkill = (id) => createSelector(
  selectSkillsDomain,
  (substate) => substate && substate.get('skills') && substate.getIn(['skills', id]).toJS()
);

export default makeSelectSkills;
export {
  selectSkillsDomain,
  makeSelectSkills,
  makeSelectSkill
};
