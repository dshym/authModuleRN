import {
  AUTHENTICATE,
  LOGOUT,
  SET_LOADING,
  SET_ERROR,
  REFRESH_TOKEN,
} from '../actions/authActionTypes';

const initialState = {
  userData: null,
  token: null,
  expirationDate: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userData: action.userData,
        token: action.token,
        expirationDate: action.expirationDate,
        error: null,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        token: action.newToken,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
