import { take, call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';

import rsf, { firebaseAuth } from 'containers/App/firebase'

import {
	LOGIN,
	CHECK_LOGGED_IN
} from './constants';

import { login, loginSuccess, loginError, setUser } from './actions';
import { indexBy, prop } from 'ramda';

import { login as loginFetch, getToken, loggedIn} from 'containers/App/auth';

const authProvider = new firebaseAuth.GoogleAuthProvider();

export function* defaultSaga(reducer) {
	try {
		const user = yield call(rsf.auth.signInWithEmailAndPassword, reducer.info.email, reducer.info.pw);
		yield put(loginSuccess(user));
	} catch (err) {
		yield put(loginError(err));
	}
}

export function* checkLoginSaga(reducer) {
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

  while(true) {
    const { error, user } = yield take(channel);

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