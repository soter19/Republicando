import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signInPage state domain
 */

const selectSignInPageDomain = state => state.get('signInPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignInPage
 */

const makeSelectSignInPage = () =>
  createSelector(selectSignInPageDomain, substate => substate.toJS());

export default makeSelectSignInPage;
export { selectSignInPageDomain };
