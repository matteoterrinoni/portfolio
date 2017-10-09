/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_USER,
  CHECK_LOGGED_IN,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './constants';

export const initialState = fromJS({
	loading:false,
	error:false,
	user:false
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return state
      	.set('loading', true)
      	.set('error', false)
    case LOGIN:
      return state
      	.set('loading', true)
      	.set('error', false)
    case LOGIN_SUCCESS:
      return state
      	.set('loading', false)
      	.set('error', false)
      	.set('user', action.user)
    case LOGIN_ERROR:
      return state
      	.set('loading', false)
      	.set('error', true)
      	.set('user', false)
    case SET_USER:
      return state
      	.set('user', action.user)
    default:
      return state;
  }
}

export default loginReducer;
