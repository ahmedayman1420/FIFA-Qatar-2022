// ===== --- ===== ### Redux & Reducers ### ===== --- ===== //
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

// ===== --- ===== ### Combine-Reducers ### ===== --- ===== //
const reducers = combineReducers({
  error: errorReducer,
  user: userReducer,
  users: usersReducer,
});

export default reducers;
