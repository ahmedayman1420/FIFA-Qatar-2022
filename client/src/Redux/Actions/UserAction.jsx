// ===== --- ===== ### Action-String ### ===== --- ===== //

// ===== --- ===== ### Error-Action ### ===== --- ===== //
import { errorResetAction, unexpectedErrorAction } from "./ErrorActions";

// ===== --- ===== ### User-APIs ### ===== --- ===== //
import {
  ContinueWithGoogleAPI,
  signInAPI,
  signUpAPI,
} from "../../APIs/UserAPIs";

// ===== --- ===== ### User-Action ### ===== --- ===== //
export const ContinueWithGoogleAction = (token) => async (dispatch) => {
  const res = await ContinueWithGoogleAPI(token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorAction(message));
    return false;
  } else {
    dispatch(errorResetAction());
    localStorage.setItem("token", res.data.payload.token);
    localStorage.setItem("User", res.data.payload.user);
    return true;
  }
};

export const SignUpAction = (user) => async (dispatch) => {
  const res = await signUpAPI(user);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorAction(message));
    return false;
  } else {
    dispatch(errorResetAction());
    localStorage.setItem("token", res.data.payload.token);
    localStorage.setItem("User", res.data.payload.user);
    return true;
  }
};

export const LoginAction = (user) => async (dispatch) => {
  const res = await signInAPI(user);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorAction(message));
    return false;
  } else {
    dispatch(errorResetAction());
    localStorage.setItem("token", res.data.payload.token);
    localStorage.setItem("User", res.data.payload.user);
    return true;
  }
};
