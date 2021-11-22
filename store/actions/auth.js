import {
  AUTHENTICATE,
  LOGOUT,
  SET_ERROR,
  SET_LOADING,
  REFRESH_TOKEN,
} from './authActionTypes';

//for auth we use authInstance, but for another requests we can use
//useAxios hook with defined interceptor for updating token
import axios from '../../authAxiosInstance';

export const authenticate = (token, expirationDate, userData) => {
  return {type: AUTHENTICATE, token, expirationDate, userData};
};

export const setError = error => {
  return {type: SET_ERROR, error};
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const refreshToken = newToken => {
  return {
    type: REFRESH_TOKEN,
    newToken,
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(setLoading());
    axios
      .post('/security/login', {
        email,
        password,
      })
      .then(response => {
        if (response.status === 200) {
          const userData = {
            email,
            password,
          };
          const expirationDate = new Date(
            new Date().getTime() + parseInt(response.data.duration),
          );

          dispatch(authenticate(response.data.token, expirationDate, userData));
          dispatch(setLoading());
        }
      })
      .catch(error => {
        dispatch(setError(error));
        dispatch(setLoading());
      });
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
