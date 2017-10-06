
import { fromJS } from 'immutable';
import skillsReducer from '../reducer';

describe('skillsReducer', () => {
  it('returns the initial state', () => {
    expect(skillsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
