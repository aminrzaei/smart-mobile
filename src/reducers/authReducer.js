import {
  LOGIN,
  SIGNOUT,
  CLEAR_ERROR_MESSAGE,
  ADD_ERROR,
} from '../actions/types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: '' };
    case LOGIN:
      return { errorMessage: '', token: action.payload };
    case SIGNOUT:
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};
