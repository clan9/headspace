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

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        loading: false
      };
    case PROFILE_SUMMARY:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case CLEAR_PROFILE:
    case DELETE_USER:
    case PROFILE_FAIL:
    case DELETE_FAIL:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
