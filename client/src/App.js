// ===== --- ===== ### Built-In ### ===== --- ===== //
import "./App.css";

// ===== --- ===== ### React-Router-Dom ### ===== --- ===== //
import { Routes, Route, Navigate } from "react-router-dom";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Authentication from "./Pages/Authentication/Authentication";
import Chats from "./Pages/Chats/Chats";

// ===== --- ===== ### App-Component ### ===== --- ===== //
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Authentication />} />
        <Route exact path="/login" element={<Authentication />} />

        <Route exact path="/chats" element={<Chats />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
