import { SET_FILTER } from '../../containers/App/constants';

export const setFilter = (filters) => ({
  type: SET_FILTER,
  payload: {
    filters
  }
});

