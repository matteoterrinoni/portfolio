import { take, call, put, select, takeEvery, takeLatest, fork } from 'redux-saga/effects';

import { LOAD_SKILL, EDIT_SKILL, PATCH_SKILL, ADD_SKILL, ADD_SKILL_SUCCESS } from './constants';
import {
	skillLoaded,
	skillLoadingError,
	skillPatched,
	skillPatchingError,
	skillEdited,
	addSkillSuccess,
	addSkillError,
	skillsLoaded
} from './actions';

import rsf, { getBaseUrl } from 'containers/App/firebase';
import request from 'utils/request';
import { syncUserSaga } from 'containers/Login/saga'

export function* getSkillSaga(reducer) {
	const requestURL = `${getBaseUrl}skills/${reducer.id}.json`;

	try {
		const skill = yield call(request, requestURL);
		yield put(skillLoaded(skill));
	} catch (err) {
		yield put(skillLoadingError(err));
	}
}

export function* patchSkillSaga(reducer) {

	try {
		yield call(rsf.database.patch, `skills/${reducer.skill.key}`, reducer.skill);
		yield put(skillPatched(reducer.skill));
	} catch (err) {
		yield put(skillPatchingError(err));
	}
}

function* editSkillSaga(reducer) {
	yield put(skillEdited(reducer.skill));
}

function* addSkill(reducer) {
	try {
		const key = yield call(rsf.database.create, 'skills', reducer.skill);
		yield put(addSkillSuccess({key:key, skill:reducer.skill}));
	} catch (err) {
		yield put(addSkillError(err));
	}
}

function* skillsData() {	
	yield fork(syncUserSaga)
	const skillsTransformer = skills => skills;
	yield [
		rsf.database.sync('skills', skillsLoaded, skillsTransformer),
		takeLatest(LOAD_SKILL, getSkillSaga),
		takeLatest(PATCH_SKILL, patchSkillSaga),
		takeLatest(EDIT_SKILL, editSkillSaga),
		takeLatest(ADD_SKILL, addSkill)
	];
}

export default skillsData;