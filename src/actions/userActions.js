import {
  REMOVE_FAIL_MESSAGE,
  REMOVE_SUCCESS_MESSAGE,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../types";
import axios from "../axios/axios";
import { bindActionCreators } from "redux";

export const register =
  (firstname, lastname, email, password) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { firstname, lastname, email, password },
    });
    try {
      const res = await axios.post("/api/users/register", {
        firstname,
        lastname,
        email,
        password,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const res = await axios.post("/api/users/login", { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
};

export const removeFailMessage = () => (dispatch) => {
  dispatch({ type: REMOVE_FAIL_MESSAGE });
};
