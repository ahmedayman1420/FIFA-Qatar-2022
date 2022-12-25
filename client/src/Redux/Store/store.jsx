// ===== --- ===== ### Redux & Redux-Thunk ### ===== --- ===== //
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

// ===== --- ===== ### Redux-Persist ### ===== --- ===== //
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// ===== --- ===== ### Reducers ### ===== --- ===== //
import reducers from "../Reducers";

// ===== --- ===== ### Redux-Persist-Configrations ### ===== --- ===== //
const persistConfig = {
  key: "FifaState",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// ===== --- ===== ### Initial-State ### ===== --- ===== //
const initialState = {
  error: { value: false, message: "", type: "" },
  user: {},
  users: [],
};

// ===== --- ===== ### Store ### ===== --- ===== //
export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
