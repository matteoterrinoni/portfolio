/*
 *
 * Skills reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SKILLS,
  LOAD_SKILLS_SUCCESS,
  LOAD_SKILLS_ERROR,
  LOAD_SKILL,
  LOAD_SKILL_SUCCESS,
  LOAD_SKILL_ERROR,
  PATCH_SKILL,
  PATCH_SKILL_SUCCESS,
  PATCH_SKILL_ERROR,
  EDIT_SKILL,
  EDIT_SKILL_SUCCESS,
  EDIT_SKILL_ERROR,
  ADD_SKILL,
  ADD_SKILL_SUCCESS,
  ADD_SKILL_ERROR
} from './constants';

import { merge } from 'ramda';
import { skillStatuses } from './model'

const initialState = fromJS({});

function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SKILLS:
		return state
			.set('loading', true)
			.set('error', false)
	case LOAD_SKILLS_SUCCESS:
		return state
			.set('skills', fromJS(action.skills))
			.set('loading', false)
	case LOAD_SKILLS_ERROR:
		return state
			.set('error', action.error)
		.set('loading', false);
	case LOAD_SKILL:
		return state
			.set('loading', true)
			.set('error', false)
	case LOAD_SKILL_SUCCESS:
		let newState = state
			.mergeIn(['skills', action.skill.key], fromJS(merge(action.skill, {status:skillStatuses.updated})))
			.set('loading', false);
		return newState;
	case LOAD_SKILL_ERROR:
		return state
			.set('error', action.error)
			.set('loading', false);
	case PATCH_SKILL:
		return state
			.set('loading', true)
			.set('error', false)
	case PATCH_SKILL_SUCCESS:
		let newStatePatch = state
			.mergeIn(['skills', action.skill.key], fromJS(merge(action.skill, {status:skillStatuses.updated})))
			.set('loading', false)
		return newStatePatch;
	case PATCH_SKILL_ERROR:
		return state
			.set('error', action.error)
			.set('loading', false);
	case EDIT_SKILL:
		return state
			.mergeIn(['skills', action.skill], state.getIn(['skills', action.skill]).set('status', skillStatuses.toBeUpdated))
	case EDIT_SKILL_SUCCESS:
		let newStateEdit = state
			.mergeIn(['skills', action.skill.key], fromJS(merge(action.skill, {status:skillStatuses.toBeUpdated})))
		return newStateEdit;
	case EDIT_SKILL_ERROR:
		return state
			.set('error', action.error)
	case ADD_SKILL:
		return state
			.set('loading', true)
			.set('error', false)
	case ADD_SKILL_SUCCESS:
		let newObj = {};
		newObj[action.info.key] = merge(action.info.skill, {key:action.info.key});
		return state
			.mergeIn(['skills'], fromJS(newObj))
	case ADD_SKILL_ERROR:
		return state
			.set('loading', false)
			.set('error', true)
    default:
      return state;
  }
}

export default skillsReducer;
