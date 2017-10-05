/*
 *
 * Login actions
 *
 */

import {
  SET_USER,
  CHECK_LOGGED_IN,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './constants'

export function checkLoggedIn() {
  return {
    type: CHECK_LOGGED_IN
  }
}

export function login(info) {
  return {
    type: LOGIN,
    info
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}
