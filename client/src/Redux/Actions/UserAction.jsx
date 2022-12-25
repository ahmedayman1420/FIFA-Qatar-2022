// ===== --- ===== ### Action-String ### ===== --- ===== //
import {
  REGISTER,
  USER_RESET,
  CONTINUE_WITH_GOOGLE,
  LOGIN,
  USERS_RESET,
  SET_USERS,
} from "./ActionStrings";

// ===== --- ===== ### Error-Action ### ===== --- ===== //
import {
  errorResetAction,
  unexpectedErrorAction,
  unexpectedErrorGetUsersAction,
} from "./ErrorActions";

// ===== --- ===== ### User-APIs ### ===== --- ===== //
import {
  ContinueWithGoogleAPI,
  GetAllUsersAPI,
  signInAPI,
  signUpAPI,
} from "../../APIs/UserAPIs";

// ===== --- ===== ### User-Action ### ===== --- ===== //
export const ContinueWithGoogleAction = (token) => async (dispatch) => {
  const res = await ContinueWithGoogleAPI(token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());
    await localStorage.setItem("token", res.data.payload.token);

    await dispatch({
      type: CONTINUE_WITH_GOOGLE,
      payload: res.data.payload.user,
    });

    return true;
  }
};

export const SignUpAction = (user) => async (dispatch) => {
  const res = await signUpAPI(user);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());
    await localStorage.setItem("token", res.data.payload.token);

    await dispatch({
      type: REGISTER,
      payload: res.data.payload.user,
    });

    return true;
  }
};

export const LoginAction = (user) => async (dispatch) => {
  const res = await signInAPI(user);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());
    await localStorage.setItem("token", res.data.payload.token);

    await dispatch({
      type: LOGIN,
      payload: res.data.payload.user,
    });

    return true;
  }
};

export const GetAllUsersAction = (token) => async (dispatch) => {
  const res = await GetAllUsersAPI(token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    console.log({ ResponseError: res });
    dispatch(unexpectedErrorGetUsersAction(message));

    dispatch({
      type: USERS_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());

    await dispatch({
      type: SET_USERS,
      payload: res.data.payload.users,
    });

    return true;
  }
};
