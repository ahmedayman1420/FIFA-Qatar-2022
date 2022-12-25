// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import { SET_USERS, USERS_RESET } from "../Actions/ActionStrings";

// ===== --- ===== ### Users-Reducer ### ===== --- ===== //
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;

    case USERS_RESET:
      return action.payload;

    default:
      return state;
  }
};

export default usersReducer;
