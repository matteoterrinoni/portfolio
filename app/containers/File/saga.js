import {
	take,
	call,
	put,
	select,
	takeEvery,
	takeLatest
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'

import { merge } from 'ramda'

import { FILE_UPLOAD, FILE_UPLOAD_SUCCESS, FILE_SYNC } from './constants';
import { fileUploading, fileUploadSuccess, fileSyncSuccess, fileSyncError } from './actions';
import { addFileToWorkSuccess, addFileToWorkError } from 'containers/Works/actions';
import rsf, {
	getBaseUrl
} from 'containers/App/firebase';


function* fileUploadSuccessCall(info) {
  try {
  	const url = yield call(rsf.storage.getDownloadURL, info.file.name);
    yield put(fileUploadSuccess(info));
  }
  catch(error) {
    //yield put(addFileToWorkError(error));
  }
}


function* percentage(snapshot, reducer) {
  const pct = snapshot.bytesTransferred * 100 / snapshot.totalBytes
  yield put(fileUploading(merge(reducer.info, {uploading: pct})))
  console.log(`${pct}%`);
}

function* sendFileSaga(reducer) {
  // const file = reducer.info.file;
  // const task = rsf.storage.uploadFile(file.name, file);

  // task.on('state_changed', snapshot => {
  //   const pct = snapshot.bytesTransferred * 100 / snapshot.totalBytes
  //   //put(fileUploading(merge(reducer.info, {uploading: pct})))
  //   console.log(`${pct}%`);

  // })

  // // Wait for upload to complete
  // yield task

  // yield put(fileUploadSuccess(reducer.info));
  // 
  
  const file = reducer.info.file;
  const task = rsf.storage.uploadFile(file.name, file);

  const channel = eventChannel(emit => task.on('state_changed', emit));

  yield takeEvery(channel, (s)=>percentage(s, reducer));

  // Wait for upload to complete
  yield task

  yield put(fileUploadSuccess(reducer.info));
  // Do something on complete
}

function* addFileToWork(reducer) {
  try {
    yield put(addFileToWorkSuccess({path:reducer.info.file.name, coordinates:reducer.info.coordinates}));
  }
  catch(error) {
    yield put(addFileToWorkError(error));
  }
}

function* fileSync(reducer) {
  try {
    const url = yield call(rsf.storage.getDownloadURL, reducer.name);
    yield put(fileSyncSuccess({name:reducer.name, path:url}));
  }
  catch(error) {
    yield put(addFileToWorkError(reducer.name));
  }
}

function* defaultSaga() {
	yield takeLatest(FILE_UPLOAD, sendFileSaga)
	yield takeLatest(FILE_UPLOAD_SUCCESS, addFileToWork)
	yield takeEvery(FILE_SYNC, fileSync)
}

export default defaultSaga