import { call, put, takeLatest, fork } from 'redux-saga/effects';

import { LOAD_WORK, EDIT_WORK, PATCH_WORK, ADD_FILE_TO_WORK, ADD_FILE_TO_WORK_SUCCESS } from 'containers/Works/constants';
import {
	workLoaded,
	workLoadingError,
	workPatched,
	workPatchingError,
	addFileToWorkSuccess,
	addFileToWorkError,
	editWork,
	workEdited
} from 'containers/Works/actions';
import { worksLoaded } from './actions';

import rsf, { getBaseUrl } from 'containers/App/firebase';
import request from 'utils/request';
import { syncUserSaga } from 'containers/Login/saga'

export function* getWorkSaga(reducer) {
	const requestURL = `${getBaseUrl}works/${reducer.id}.json`;

	try {
		const work = yield call(request, requestURL);
		yield put(workLoaded(work));
	} catch (err) {
		yield put(workLoadingError(err));
	}
}

export function* patchWorkSaga(reducer) {

	try {
		yield call(rsf.database.patch, `works/${reducer.work.key}`, reducer.work);
		yield put(workPatched(reducer.work));
	} catch (err) {
		yield put(workPatchingError(err));
	}
}

function* syncFileUrl(info) {
  try {
    yield call(rsf.storage.getDownloadURL, info.file.name);
    yield put(addFileToWorkSuccess({path:info.file.name, coordinates:info.coordinates}));
  }
  catch(error) {
    yield put(addFileToWorkError(error));
  }
}

function* sendFileSaga(reducer) {
  const file = reducer.info.file;
  const task = rsf.storage.uploadFile(file.name, file);

  task.on('state_changed', snapshot => {
    const pct = snapshot.bytesTransferred * 100 / snapshot.totalBytes
    console.log(`${pct}%`);
  })

  // Wait for upload to complete
  yield task

  yield syncFileUrl(reducer.info);
}

function* editWorkSaga(reducer) {
	yield put(workEdited(reducer.work));
}

function* updateWorkAfterFileAddedd(reducer) {
	const c = reducer.info.coordinates;
	yield put(editWork(c[0]))
}

function* worksData() {	
	yield fork(syncUserSaga)
	const worksTransformer = works => works;
	yield [
		rsf.database.sync('works', worksLoaded, worksTransformer),
		takeLatest(LOAD_WORK, getWorkSaga),
		takeLatest(PATCH_WORK, patchWorkSaga),
		takeLatest(EDIT_WORK, editWorkSaga),
		takeLatest(ADD_FILE_TO_WORK, sendFileSaga),
		takeLatest(ADD_FILE_TO_WORK_SUCCESS, updateWorkAfterFileAddedd)
	];
}

export default worksData;