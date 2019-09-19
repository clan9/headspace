import authReducer from 'reducers/auth';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT
} from 'actions/types';

describe('authReducer tests', () => {
  it('should set the default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      user: {},
      error: null
    });
  });

  it('should handle loading a user', () => {
    const user = { name: 'Sim', id: 1 };
    const action = { type: USER_LOADED, payload: user };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...state,
      isAuthenticated: true,
      loading: false,
      user
    });
  });

  it('should handle registering a user', () => {
    const action = { type: REGISTER_SUCCESS, payload: 'jsonWebToken' };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...state,
      isAuthenticated: true,
      loading: false
    });
  });

  it('should handle user logging in', () => {
    const action = { type: LOGIN_SUCCESS, payload: 'jsonWebToken' };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...state,
      isAuthenticated: true,
      loading: false
    });
  });

  it('should handle all auth fail cases (all use the same reducer case, payload is just error message text)', () => {
    const action = { type: LOGIN_FAIL, payload: 'Applicable error message' };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      error: action.payload,
      loading: false,
      isAuthenticated: false,
      user: {},
      token: null
    });
  });

  it('should handle a user logging out', () => {
    const action = { type: LOGOUT };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      error: action.payload,
      loading: false,
      isAuthenticated: false,
      user: {},
      token: null
    });
  });
});
