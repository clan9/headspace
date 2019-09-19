import axios from 'axios';
import {
  PROFILE_SUMMARY,
  PROFILE_FAIL,
  CLEAR_PROFILE,
  LOGOUT,
  DELETE_USER,
  DELETE_FAIL
} from 'actions/types';

export const profileSummary = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/profile');
    dispatch({ type: PROFILE_SUMMARY, payload: res.data });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({ type: PROFILE_FAIL });
  }
};

export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};

export const deleteUser = history => async dispatch => {
  try {
    const res = await axios.delete('/api/user');
    dispatch({ type: DELETE_USER, payload: res.data });
    dispatch({ type: LOGOUT });
    history.push('/');
  } catch (err) {
    dispatch({ type: DELETE_FAIL });
  }
};
