/*
 *
 * File reducer
 *
 */

import {
	fromJS
} from 'immutable';
import {
	FILE_UPLOAD,
	FILE_UPLOADING,
	FILE_UPLOAD_SUCCESS,
	FILE_UPLOAD_ERROR,
	FILE_SYNC,
	FILE_SYNC_SUCCESS,
	FILE_SYNC_ERROR
} from './constants';
import { fileKey, nameToKey } from './model'

const initialState = fromJS({});

function fileReducer(state = initialState, action) {
	switch (action.type) {
	case FILE_UPLOAD:
		const key = fileKey(action.info.file)
		return state
			.set(key, fromJS({file:action.info.file.name}))
			.mergeIn([key], fromJS({
				loading: true,
				uploading: 0,
				error: false
			}))
			.mergeIn([key], fromJS({
				loading: true,
				uploading: 0,
				error: false
			}))
	case FILE_UPLOADING:
		return state
			.mergeIn([fileKey(action.info.file)], fromJS({
				uploading: action.info.uploading
			}))
	case FILE_UPLOAD_SUCCESS:
		return state
			.mergeIn([fileKey(action.info.file)], fromJS({
				uploading: 100,
				loading: false
			}))
	case FILE_UPLOAD_ERROR:
		return state
			.mergeIn([fileKey(action.info.file)], fromJS({
				uploading: 0,
				loading: false,
				error: action.error
			}))
	case FILE_SYNC:
		return state
			.mergeIn([nameToKey(action.name)], fromJS({
				loading: true
			}))
	case FILE_SYNC_SUCCESS:
		return state
			.mergeIn([nameToKey(action.info.name)], fromJS({
				loading: false,
				error: false,
				path: action.info.path
			}))
	case FILE_SYNC_ERROR:
		return state
			.mergeIn([nameToKey(action.name)], fromJS({
				loading: false,
				error: true
			}))
	default:
		return state;
	}
}

export default fileReducer;