// ===== --- ===== ### Built-In ### ===== --- ===== //
import "./App.css";

// ===== --- ===== ### React-Router-Dom ### ===== --- ===== //
import { Routes, Route, Navigate } from "react-router-dom";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Authentication from "./Pages/Authentication/Authentication";
import Home from "./Pages/Home/Home.jsx";
import NavigationBar from "./Components/NavigationBar/NavigationBar";

// ===== --- ===== ### App-Component ### ===== --- ===== //
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route exact path="/register" element={<Authentication />} />
        <Route exact path="/login" element={<Authentication />} />

        <Route exact path="/home" element={<Home />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
