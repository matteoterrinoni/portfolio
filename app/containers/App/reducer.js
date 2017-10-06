/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {merge, indexBy, prop} from 'ramda';

import {
  DEFAULT_LOCALE,
  TOGGLE_SIDEMENU
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  sidemenu: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
  	case TOGGLE_SIDEMENU:
  		return state.
  		set('sidemenu', !state.get('sidemenu'))
    default:
      return state;
  }
}

export default appReducer;