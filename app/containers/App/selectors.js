import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectSidemenu = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('sidemenu')
);

export {
  makeSelectLocation,
  makeSelectLoading,
  makeSelectError,
  makeSelectSidemenu
};
