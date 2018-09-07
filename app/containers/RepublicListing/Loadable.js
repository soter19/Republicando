/**
 *
 * Asynchronously loads the component for RepublicListing
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
