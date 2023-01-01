// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import {
  CONTINUE_WITH_GOOGLE,
  REGISTER,
  LOGIN,
  USER_RESET,
  EDIT_USER,
} from "../Actions/ActionStrings";

// ===== --- ===== ### User-Reducer ### ===== --- ===== //
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER:
      return action.payload;

    case LOGIN:
      return action.payload;

    case CONTINUE_WITH_GOOGLE:
      return action.payload;

    case EDIT_USER:
      return action.payload;

    case USER_RESET:
      return {};

    default:
      return state;
  }
};

export default userReducer;
