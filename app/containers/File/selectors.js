import { createSelector } from 'reselect';
import { nameToKey } from './model';

const selectFileDomain = (state) => state.get('file');

const makeSelectFile = (name) => createSelector(
  selectFileDomain,
  (substate) => {
  	const key = name && nameToKey(name);
  	return name && substate && substate.get(key) && substate.get(key).toJS()
  }
);

const makeSelectFiles = () => createSelector(
  selectFileDomain,
  (substate) => {
  	return substate && substate.toJS()
  }
);

export default makeSelectFile;
export {
  selectFileDomain,
  makeSelectFile,
  makeSelectFiles
};
