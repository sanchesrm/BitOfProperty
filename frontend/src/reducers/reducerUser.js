import { USER_ACTIONS } from "../actions/userActions";

export default function(state = [], action) {
  switch (action.type) {
    case USER_ACTIONS.CREATE_USER:
    case USER_ACTIONS.FETCH_USERS:
    case USER_ACTIONS.DELETE_USER:
      return action.payload;
    default:
      return state;
  }
}
