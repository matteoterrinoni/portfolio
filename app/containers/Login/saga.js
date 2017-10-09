import { take, call, put, takeEvery, fork } from 'redux-saga/effects';

import rsf from 'containers/App/firebase'

import {
	LOGIN,
} from './constants';

import { loginSuccess, loginError } from './actions';

import { loggedIn} from 'containers/App/auth';

//const authProvider = new firebaseAuth.GoogleAuthProvider();

export function* defaultSaga(reducer) {
	try {
		const user = yield call(rsf.auth.signInWithEmailAndPassword, reducer.info.email, reducer.info.pw);
		yield put(loginSuccess(user));
	} catch (err) {
		yield put(loginError(err));
	}
}

export function* checkLoginSaga() {
	const user = loggedIn();
	console.log(user);
	if(user){
		yield put(loginSuccess(user));
	}else{
		yield put(loginError('err'));
	}
}

export function* syncUserSaga() {
  const channel = yield call(rsf.auth.channel);

  while (true) {
    const { user } = yield take(channel);
    
    if (user) yield put(loginSuccess(user));
    else yield put(loginError());
  }
}

function* loginData() {	
	yield fork(syncUserSaga)
	yield [
		takeEvery(LOGIN, defaultSaga),
	]
}

export default loginData;