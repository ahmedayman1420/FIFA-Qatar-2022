// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import {
  DELETE_USER,
  SET_USERS,
  UPDATE_USER_ROLE,
  USERS_RESET,
} from "../Actions/ActionStrings";

// ===== --- ===== ### Users-Reducer ### ===== --- ===== //
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;

    case UPDATE_USER_ROLE:
      return state.map((user) => {
        if (user._id === action.payload) user.role = "manager";
        return user;
      });

    case DELETE_USER:
      return state.filter((user) => {
        return user._id !== action.payload;
      });

    case USERS_RESET:
      return [];

    default:
      return state;
  }
};

export default usersReducer;
