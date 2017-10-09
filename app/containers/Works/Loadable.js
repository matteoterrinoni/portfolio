/**
 *
 * Asynchronously loads the component for Works
 *
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
});
