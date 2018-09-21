/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, SET_USER_TYPE } from './constants';
import { replace } from 'react-router-redux';
import { doSignInWithEmailAndPassword } from '../../api/auth';
import { getUserTypeFromId } from '../../api';

export const loginStartAction = () => ({
  type: LOGIN_START,
});

export const loginSuccessAction = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginErrorAction = (payload) => ({
  type: LOGIN_ERROR,
  payload,
});

export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: {
    userType
  }
});


export const login = (dispatch) => (email, password) => {
  dispatch(loginStartAction());
  doSignInWithEmailAndPassword(email, password).then(({ user }) => {
    getUserTypeFromId(user.uid).then((res) => {
      dispatch(setUserType(res))
    });
    dispatch(loginSuccessAction({ id: user.uid, email}));
    dispatch(replace('/'))
  }).catch((e) => dispatch(loginErrorAction(e)))
};
