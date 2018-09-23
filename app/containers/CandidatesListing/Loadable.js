/**
 *
 * Asynchronously loads the component for CandidatesListing
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
