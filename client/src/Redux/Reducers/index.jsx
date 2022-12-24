// ===== --- ===== ### Redux & Reducers ### ===== --- ===== //
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

// ===== --- ===== ### Combine-Reducers ### ===== --- ===== //
const reducers = combineReducers({
  error: errorReducer,
});

export default reducers;
