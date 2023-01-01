// ===== --- ===== ### Redux & Reducers ### ===== --- ===== //
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import matchReducer from "./macthReducer";
import stadiumReducer from "./stadiumReducer";
import ticketReducer from "./ticketReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

// ===== --- ===== ### Combine-Reducers ### ===== --- ===== //
const reducers = combineReducers({
  error: errorReducer,
  user: userReducer,
  users: usersReducer,
  stadiums: stadiumReducer,
  matches: matchReducer,
  tickets: ticketReducer,
});

export default reducers;
