// ===== --- ===== ### Redux & Redux-Thunk ### ===== --- ===== //
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

// ===== --- ===== ### Reducers ### ===== --- ===== //
import reducers from "../Reducers";

// ===== --- ===== ### Initial-State ### ===== --- ===== //
const initialState = {
  error: { value: false, message: "", type: "" },
};

// ===== --- ===== ### Store ### ===== --- ===== //
export const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(thunk))
);
