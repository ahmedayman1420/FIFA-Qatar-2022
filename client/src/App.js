// ===== --- ===== ### Built-In ### ===== --- ===== //
import "./App.css";

// ===== --- ===== ### React-Router-Dom ### ===== --- ===== //
import { Routes, Route, Navigate } from "react-router-dom";

// ===== --- ===== ### External-Components ### ===== --- ===== //
import Authentication from "./Pages/Authentication/Authentication";
import Home from "./Pages/Home/Home.jsx";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import UserAuthority from "./Pages/UserAuthority/UserAuthority";
import Stadium from "./Pages/Stadium/Stadium";
import Stadiums from "./Pages/Stadiums/Stadiums";
import CreateMatch from "./Pages/CreateMatch/CreateMatch";
import Matches from "./Pages/Matches/Matches";
import MatchDetails from "./Pages/MatchDetails/MatchDetails";

import ProtectedRouteAdmin from "./Components/ProtectedRoute/ProtectedRouteAdmin";
import ProtectedRouteUser from "./Components/ProtectedRoute/ProtectedRouteUser";
import ProtectedRouteManager from "./Components/ProtectedRoute/ProtectedRouteManager";
// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### User-Action ### ===== --- ===== //
import { USERS_RESET } from "./Redux/Actions/ActionStrings";

// ===== --- ===== ### App-Component ### ===== --- ===== //
function App() {
  // ===== --- ===== ### Clear-On-Browser-Close ### ===== --- ===== //
  // const dispatch = useDispatch();
  // window.onbeforeunload = () => {
  //   // Clear the local storage
  //   alert("HERE");
  //   dispatch({
  //     type: USERS_RESET,
  //     payload: {},
  //   });
  // };

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route exact path="/register" element={<Authentication />} />
        <Route exact path="/login" element={<Authentication />} />

        <Route exact path="/home" element={<Home />} />

        <Route element={<ProtectedRouteAdmin />}>
          <Route exact path="/user-auth" element={<UserAuthority />} />
        </Route>

        <Route element={<ProtectedRouteManager />}>
          <Route exact path="/stadium" element={<Stadium />} />
          <Route exact path="/create-match/:id" element={<CreateMatch />} />
        </Route>

        <Route exact path="/stadiums" element={<Stadiums />} />
        <Route exact path="/matches" element={<Matches />} />
        <Route exact path="/match-details/:id" element={<MatchDetails />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
