import {
  FETCH_ALL_POSTS,
  FETCH_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  POST_ERROR,
  LIKE_POST,
  UNLIKE_POST
} from 'actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: true,
  error: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_POSTS:
      return { ...state, posts: payload, post: {}, loading: false };
    case FETCH_POST:
      return { ...state, post: payload, loading: false };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload._id),
        post: {},
        loading: false
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload._id) {
            return { ...post, ...payload };
          } else {
            return post;
          }
        }),
        post: {},
        loading: false
      };
    case ADD_COMMENT:
    case LIKE_POST:
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          return post._id === payload._id ? { ...post, ...payload } : post;
        }),
        loading: false,
        error: ''
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
