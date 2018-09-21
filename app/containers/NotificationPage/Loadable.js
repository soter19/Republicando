/**
 *
 * Asynchronously loads the component for NotificationPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
