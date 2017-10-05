/*
 *
 * Works actions
 *
 */

import {
	LOAD_WORKS,
	LOAD_WORKS_SUCCESS,
	LOAD_WORKS_ERROR,
	LOAD_WORK,
	LOAD_WORK_SUCCESS,
	LOAD_WORK_ERROR,
	PATCH_WORK,
	PATCH_WORK_SUCCESS,
	PATCH_WORK_ERROR,
	ADD_FILE_TO_WORK,
	ADD_FILE_TO_WORK_SUCCESS,
	ADD_FILE_TO_WORK_ERROR,
	EDIT_WORK,
	EDIT_WORK_SUCCESS,
	EDIT_WORK_ERROR,
} from './constants'

/**
 * Load works, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_WORKS
 */
export function loadWorks() {
	return {
		type: LOAD_WORKS,
	};
}

/**
 * Dispatched when works are loaded by the request saga
 *
 * @param  {array} works The works data
 *
 * @return {object}      An action object with a type of LOAD_WORKS_SUCCESS passing the works
 */
export function worksLoaded(works) {
	return {
		type: LOAD_WORKS_SUCCESS,
		works
	};
}

/**
 * Dispatched when loading works fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_WORKS_ERROR passing the error
 */
export function worksLoadingError(error) {
	return {
		type: LOAD_WORKS_ERROR,
		error,
	};
}

/**
 * Load work, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_WORKS
 */
export function loadWork(id) {
	return {
		type: LOAD_WORK,
		id
	};
}

/**
 * Dispatched when works are loaded by the request saga
 *
 * @param  {array} works The works data
 *
 * @return {object}      An action object with a type of LOAD_WORKS_SUCCESS passing the works
 */
export function workLoaded(work) {
	return {
		type: LOAD_WORK_SUCCESS,
		work
	};
}

/**
 * Dispatched when loading works fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_WORKS_ERROR passing the error
 */
export function workLoadingError(error) {
	return {
		type: LOAD_WORK_ERROR,
		error,
	};
}


export function patchWork(work) {
	return {
		type: PATCH_WORK,
		work
	};
}

export function workPatched(work) {
	return {
		type: PATCH_WORK_SUCCESS,
		work
	};
}

export function workPatchingError(error) {
	return {
		type: PATCH_WORK_ERROR,
		error
	};
}

export function addFileToWork(info) {
	return {
		type: ADD_FILE_TO_WORK,
		info
	};
}

export function addFileToWorkSuccess(info) {
	return {
		type: ADD_FILE_TO_WORK_SUCCESS,
		info
	};
}

export function addFileToWorkError(error) {
	return {
		type: ADD_FILE_TO_WORK_ERROR,
		error
	};
}

export function editWork(work) {
	return {
		type: EDIT_WORK,
		work
	};
}

export function workEdited(work) {
	return {
		type: EDIT_WORK_SUCCESS,
		work
	};
}

export function workEditingError(error) {
	return {
		type: EDIT_WORK_ERROR,
		error
	};
}