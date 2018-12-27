import { SIGN_IN, CLEAR_SIGN_IN } from "../actions/signinActions";

export default function(state = [], action) {
  switch (action.type) {
    case SIGN_IN:
      return action.payload.data;
    case CLEAR_SIGN_IN:
      return {};
    default:
      return state;
  }
}
