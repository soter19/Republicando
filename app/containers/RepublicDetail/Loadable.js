/**
 *
 * Asynchronously loads the component for RepublicDetail
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
