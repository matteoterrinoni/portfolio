/*
 *
 * Works reducer
 *
 */

import {
	fromJS,
} from 'immutable';
import {
	LOAD_WORKS_SUCCESS,
	LOAD_WORKS,
	LOAD_WORKS_ERROR,
	LOAD_WORK_SUCCESS,
	LOAD_WORK,
	LOAD_WORK_ERROR,
	PATCH_WORK,
	PATCH_WORK_SUCCESS,
	PATCH_WORK_ERROR,
	EDIT_WORK,
	EDIT_WORK_SUCCESS,
	EDIT_WORK_ERROR,
	ADD_FILE_TO_WORK,
	ADD_FILE_TO_WORK_SUCCESS,
	ADD_FILE_TO_WORK_ERROR
} from './constants';

import { merge } from 'ramda'
import { workStatuses } from './model'

const initialState = fromJS({
	loading: false,
	error: false,
	works: false
});

function worksReducer(state = initialState, action) {
	switch (action.type) {
	case LOAD_WORKS:
		return state
			.set('loading', true)
			.set('error', false)
	case LOAD_WORKS_SUCCESS:
		return state
			.set('works', fromJS(action.works))
			.set('loading', false)
	case LOAD_WORKS_ERROR:
		return state
			.set('error', action.error)
		.set('loading', false);
	case LOAD_WORK:
		return state
			.set('loading', true)
			.set('error', false)
	case LOAD_WORK_SUCCESS:
		let newState = state
			.mergeIn(['works', action.work.key], fromJS(merge(action.work, {status:workStatuses.updated})))
			.set('loading', false);
		return newState;
	case LOAD_WORK_ERROR:
		return state
			.set('error', action.error)
			.set('loading', false);
	case PATCH_WORK:
		return state
			.set('loading', true)
			.set('error', false)
	case PATCH_WORK_SUCCESS:
		let newStatePatch = state
			.mergeIn(['works', action.work.key], fromJS(merge(action.work, {status:workStatuses.updated})))
			.set('loading', false)
		return newStatePatch;
	case PATCH_WORK_ERROR:
		return state
			.set('error', action.error)
			.set('loading', false);
	case EDIT_WORK:
		return state
			.mergeIn(['works', action.work], state.getIn(['works', action.work]).set('status', workStatuses.toBeUpdated))
	case EDIT_WORK_SUCCESS:
		let newStateEdit = state
			.mergeIn(['works', action.work.key], fromJS(merge(action.work, {status:workStatuses.toBeUpdated})))
		return newStateEdit;
	case EDIT_WORK_ERROR:
		return state
			.set('error', action.error)
	case ADD_FILE_TO_WORK:
		return state
			.set('loading', true)
			.set('error', false)
	case ADD_FILE_TO_WORK_SUCCESS:
		let _coordinates = ['works'].concat(action.info.coordinates);
		if (state.hasIn(_coordinates)) {
			return state
				.set('loading', false)
				.updateIn(_coordinates, list => {
					return list.push(action.info.path)
				})
		} else {
			let obj = {};
			obj[_coordinates[_coordinates.length-1]] = [action.info.path];
			let __coordinates = _coordinates.slice(0, -1);
			const newObj = fromJS(obj);
			return state
				.mergeIn(__coordinates, newObj)
				.set('loading', false)
		}
	case ADD_FILE_TO_WORK_ERROR:
		return state
			.set('loading', false)
			.set('error', true)		
	default:
		return state;
	}
}

export default worksReducer;