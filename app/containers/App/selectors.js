/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectFirestoreData = state => state.get('firestore');

const makeSelectFirestoreClients = () =>
  createSelector(selectFirestoreData, data => data && data.clients);

export { selectGlobal, makeSelectFirestoreClients };
