/**
 *
 * Asynchronously loads the component for RepublicListingAdmin
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
