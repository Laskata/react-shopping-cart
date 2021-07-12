import {
  REMOVE_FAIL_MESSAGE,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../types";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    // case USER_REGISTER_REQUEST:
    //   return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {};
    case USER_REGISTER_FAIL:
      return { error: action.payload };
    case REMOVE_FAIL_MESSAGE:
      return { error: null };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    // case USER_SIGNIN_REQUEST:
    //   return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { usersInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { error: action.payload };
    case REMOVE_FAIL_MESSAGE:
      return { error: null };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
