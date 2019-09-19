import profileReducer from 'reducers/profile';
import moment from 'moment';
import {
  USER_LOADED,
  PROFILE_SUMMARY,
  PROFILE_FAIL,
  DELETE_USER,
  DELETE_FAIL,
  CLEAR_PROFILE
} from 'actions/types';

const initialState = {
  name: '',
  email: '',
  registerDate: null,
  postCount: 0,
  commentCount: 0,
  likeCount: 0,
  mostCommentedPost: {},
  mostLikedPost: {},
  loading: true
};

describe('profileReducer tests', () => {
  it('loads a users profile', () => {
    const payload = { name: 'sim', email: 's@gmail.com' };
    const action = { type: USER_LOADED, payload };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      name: payload.name,
      email: payload.email,
      loading: false
    });
  });

  it('returns the profile summary', () => {
    const payload = {
      registerDate: moment(0).add(1, 'day'),
      postCount: 6,
      commentCount: 7,
      likeCount: 5,
      mostCommentedPost: { _id: '9', title: 'test post' },
      mostLikedPost: { _id: '7', title: 'another test post' }
    };

    const action = { type: PROFILE_SUMMARY, payload };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({ ...initialState, ...payload, loading: false });
  });

  it('should handle the profile error/delete user cases (they all use the same reducer, just reset the profile to initial state)', () => {
    const action = {
      type: PROFILE_FAIL
    };
    const state = profileReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
