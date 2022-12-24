// ===== --- ===== ### Built-In ### ===== --- ===== //
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ===== --- ===== ### React-Router-Dom ### ===== --- ===== //
import { BrowserRouter } from "react-router-dom";

// ===== --- ===== ### Bootstrap-Style ### ===== --- ===== //
import "bootstrap/dist/css/bootstrap.min.css";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store/store";

// ===== --- ===== ### Redux-Persist ### ===== --- ===== //
import { PersistGate } from "redux-persist/integration/react";

// ===== --- ===== ### Root ### ===== --- ===== //
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
