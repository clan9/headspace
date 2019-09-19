import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from 'actions/types';
import { setAuthToken } from 'utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/user');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.msg });
  }
};

// Register a new user
export const registerUser = (
  { name, email, password },
  history
) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/signup', { name, email, password });

    // res.data is token
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    setTimeout(() => {
      dispatch({ type: REGISTER_FAIL, payload: '' });
    }, 5000);
  }
};

// Login existing user
export const login = ({ email, password }, history) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/signin', { email, password });

    // res.data is token
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: 'Invalid credentials' });
    setTimeout(() => {
      dispatch({ type: LOGIN_FAIL, payload: '' });
    }, 5000);
  }
};

// Logout user
export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
