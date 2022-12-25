// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { Outlet, Navigate, useLocation } from "react-router-dom";

// ======= --- ======= <| JWT-Decode |> ======= --- ======= //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| Component |> ======= --- ======= //
const ProtectedRouteUser = () => {
  const location = useLocation();
  // ======= --- ======= <| Component-States |> ======= --- ======= //
  let token = localStorage.getItem("token");
  let auth = false;

  try {
    var decoded = jwt_decode(token);
    if (decoded.data.role === "fan") auth = true;
    else localStorage.clear();
  } catch (error) {
    localStorage.clear();
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
  // return auth ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={"/signin?return=" + location.pathname} />
  // );
};

export default ProtectedRouteUser;
