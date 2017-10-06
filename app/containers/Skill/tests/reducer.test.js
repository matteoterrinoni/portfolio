
import { fromJS } from 'immutable';
import skillReducer from '../reducer';

describe('skillReducer', () => {
  it('returns the initial state', () => {
    expect(skillReducer(undefined, {})).toEqual(fromJS({}));
  });
});
