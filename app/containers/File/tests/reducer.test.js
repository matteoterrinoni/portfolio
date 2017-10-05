
import { fromJS } from 'immutable';
import fileReducer from '../reducer';

describe('fileReducer', () => {
  it('returns the initial state', () => {
    expect(fileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
