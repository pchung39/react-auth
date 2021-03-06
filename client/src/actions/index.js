import axios from "axios";
import { browserHistory } from "react-router";
import { AUTH_USER,
        AUTH_ERROR,
        UNAUTH_USER
      } from "./types";

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    console.log(email,password);
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if request is good
        // update state to indicate user is authenticated
        dispatch({ type: AUTH_USER})
        // save the jwt token
        localStorage.setItem("token", response.data.token);
        // redirect to the route /feature
        browserHistory.push("/feature");

      })
      .catch(() => {
        // if request is bad
        // show error to the user
        dispatch(authError("Bad Login Info"));
      });
  }

}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
}
