import { createSelector } from 'reselect';

/**
 * Direct selector to the photos state domain
 */
const selectPhotosDomain = (state) => state.get('photos');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Photos
 */

const makeSelectPhotos = () => createSelector(
  selectPhotosDomain,
  (substate) => substate.toJS()
);

export default makeSelectPhotos;
export {
  selectPhotosDomain,
};
