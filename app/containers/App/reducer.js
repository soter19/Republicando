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

import {
	SET_USER_TYPE,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SET_FILTER,
	SET_REPUBLICS,
	SET_LOADING, SET_OFFERS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUserType: '',
  userData: {},
  currentFilters: [],
  republics: [],
});

function appReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_START:
      return state.set('loading', true);
    case LOGIN_SUCCESS:
      return state.set('loading', false).set('userData', fromJS({...payload}));
    case LOGIN_ERROR:
      return state.set({ loading: false, error: payload, });
    case SET_USER_TYPE:
      return state.set('currentUserType', payload.userType,);
    case SET_FILTER:
      return state.set('currentFilters', fromJS(payload.filters));
    case SET_REPUBLICS:
      return state.set('republics', fromJS(payload.republics)).set('loading', false);
    case SET_LOADING:
      return state.set('loading', payload.loading);
    case SET_OFFERS:
      return state.setIn(['userData', 'offers'], payload.offers);
    default:
      return state;
  }
}

export default appReducer;
