import axios from 'axios';
import {
  FETCH_ALL_POSTS,
  FETCH_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  LIKE_POST,
  UNLIKE_POST,
  POST_ERROR
} from 'actions/types';

export const fetchAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: FETCH_ALL_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const fetchPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: FETCH_POST, payload: res.data });
  } catch (err) {
    console.log('ERROR MSG:', err);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const addPost = (formData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/posts', formData);
    dispatch({ type: ADD_POST, payload: res.data });
    history.push('/dashboard');
  } catch (err) {
    console.log('ERROR MSG:', err.response.data.msg);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const deletePost = (id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: res.data });
    history.push('/dashboard');
  } catch (err) {
    console.log('ERROR MSG:', err.response.data.msg);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const editPost = (id, formData, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/posts/${id}`, formData);
    dispatch({ type: EDIT_POST, payload: res.data });
    history.push('/dashboard');
  } catch (err) {
    console.log('ERROR MSG:', err.response.data.msg);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const addComment = ({
  text,
  createdAt,
  id,
  history
}) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/${id}/comments`, {
      text,
      createdAt
    });
    // res.data is the post, not just the comments array for that post (this is a change to original controller)
    dispatch({ type: ADD_COMMENT, payload: res.data });
    history.push(`/post/${id}`);
  } catch (err) {
    console.log('ERROR MSG:', err.response.data.msg);
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
  }
};

// Include this or not?
export const deleteComment = () => async dispatch => {
  return {};
};

export const likePost = id => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/${id}/like`);
    dispatch({ type: LIKE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
    setTimeout(() => {
      dispatch({ type: POST_ERROR, payload: '' });
    }, 6000);
  }
};

export const unlikePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}/unlike`);
    dispatch({ type: UNLIKE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.data.msg
    });
    setTimeout(() => {
      dispatch({ type: POST_ERROR, payload: '' });
    }, 6000);
  }
};
