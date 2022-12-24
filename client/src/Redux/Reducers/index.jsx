// ===== --- ===== ### Redux & Reducers ### ===== --- ===== //
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

// ===== --- ===== ### Combine-Reducers ### ===== --- ===== //
const reducers = combineReducers({
  error: errorReducer,
  user: userReducer,
});

export default reducers;
