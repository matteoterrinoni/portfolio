
import { fromJS } from 'immutable';
import photosReducer from '../reducer';

describe('photosReducer', () => {
  it('returns the initial state', () => {
    expect(photosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
