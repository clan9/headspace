import filtersReducer from 'reducers/filters';
import {
  SET_TEXT_FILTER,
  SORT_BY_COMMENTS,
  SORT_BY_DATE,
  SORT_BY_LIKES
} from 'actions/types';
import filters from 'reducers/filters';

describe('filtersReducer tests', () => {
  it('should set the default filters', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      text: '',
      sortBy: 'date'
    });
  });

  it('should set sortBy to comments', () => {
    const action = { type: SORT_BY_COMMENTS };
    const state = filtersReducer(undefined, action);

    expect(state.sortBy).toBe('comments');
  });

  it('should set sortBy to likes', () => {
    const action = { type: SORT_BY_LIKES };
    const state = filtersReducer(undefined, action);

    expect(state.sortBy).toBe('likes');
  });

  it('should set sortBy to date', () => {
    const initialState = { text: 'whatever', sortBy: 'likes' };
    const action = { type: SORT_BY_DATE };
    const state = filtersReducer(initialState, action);

    expect(state.sortBy).toBe('date');
  });

  it('should set the text filter correctly', () => {
    const text = 'Hello';
    const action = { type: SET_TEXT_FILTER, payload: text };
    const state = filtersReducer(undefined, action);

    expect(state.text).toBe('Hello');
  });
});
