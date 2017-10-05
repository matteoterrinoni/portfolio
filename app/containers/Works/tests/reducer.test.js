
import { fromJS } from 'immutable';
import worksReducer from '../reducer';

describe('worksReducer', () => {
  it('returns the initial state', () => {
    expect(worksReducer(undefined, {})).toEqual(fromJS({}));
  });
});
