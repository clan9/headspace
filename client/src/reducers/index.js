import { combineReducers } from 'redux';
import authReducer from 'reducers/auth';
import postsReducer from 'reducers/posts';
import filtersReducer from 'reducers/filters';
import profileReducer from 'reducers/profile';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  filters: filtersReducer,
  profile: profileReducer
});
