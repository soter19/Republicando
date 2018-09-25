/**
 *
 * Asynchronously loads the component for RepublicOffersPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
