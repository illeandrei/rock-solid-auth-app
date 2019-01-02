import axios from "axios";
import { AUTH_USER, AUTH_ERROR, SIGN_OUT } from "./types";

//because of reduxThunk we can return either an object
//or a function from an action creator
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    callback();
    localStorage.setItem("token", response.data.token);
  } catch (e) {
    console.log("error:", e);
    dispatch({
      type: AUTH_ERROR,
      payload: "Email in use"
    });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    callback();
    localStorage.setItem("token", response.data.token);
  } catch (e) {
    console.log("error:", e);
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid login credentials"
    });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: SIGN_OUT
  };
};
