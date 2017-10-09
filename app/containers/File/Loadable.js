/**
 *
 * Asynchronously loads the component for File
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
});
