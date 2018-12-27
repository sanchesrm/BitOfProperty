import axios from "axios";
import { ROOT_URL } from "../config";

export const SIGN_IN = "SIGN_IN";
export const CLEAR_SIGN_IN = "CLEAR_SIGN_IN";

export const signInUser = bodyValues => {
  const url = `${ROOT_URL}/signin`;
  const request = axios.put(url, bodyValues);

  return {
    type: SIGN_IN,
    payload: request
  };
};

export const logout = () => {
  return {
    type: CLEAR_SIGN_IN,
    payload: {}
  };
};
