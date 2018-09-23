/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectFirestoreData = state => state.get('firestore');

const makeSelectFirestoreClients = () =>
  createSelector(selectFirestoreData, data => data && data.clients);

export const makeSelectUserData = () =>
  createSelector(selectGlobal, data => data && data.get('userData').toJS());

export const makeSelectFilters = () =>
  createSelector(selectGlobal, data => data && data.get('currentFilters').toJS());

export const makeSelectRepublics = () =>
  createSelector(selectGlobal, data => data && data.get('republics').toJS())

export { selectGlobal, makeSelectFirestoreClients };
