import axios from "axios";
import { ROOT_URL } from "../config";

export const USER_ACTIONS = {
  CREATE_USER: "CREATE_USER",
  FETCH_USERS: "FETCH_USERS",
  DELETE_USER: "DELETE_USER"
};

export const createUser = username => {
  const url = `${ROOT_URL}/createUser`;
  const request = axios.post(url, { username });

  return {
    type: USER_ACTIONS.CREATE_USER,
    payload: request
  };
};

export const fetchUsers = () => {
  const url = `${ROOT_URL}/fetchUsers`;
  const request = axios.get(url);

  return {
    type: USER_ACTIONS.FETCH_USERS,
    payload: request
  };
};

export const deleteUser = userId => {
  const url = `${ROOT_URL}/deleteUser/${userId}`;
  const request = axios.delete(url);

  return {
    type: USER_ACTIONS.DELETE_USER,
    payload: request
  };
};
