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

import { SET_USER_TYPE, LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUserType: '',
  userData: {},
});

function appReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_START:
      return state.set('loading', true);
    case LOGIN_SUCCESS:
      return state.set('loading', false).set('userData', {...payload});
    case LOGIN_ERROR:
      return state.set({
        loading: false,
        error: payload,
      });
    case SET_USER_TYPE:
      debugger
      return state.set('currentUserType', payload.userType,);
    default:
      return state;
  }
}

export default appReducer;
