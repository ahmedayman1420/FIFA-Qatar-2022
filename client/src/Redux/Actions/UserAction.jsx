// ===== --- ===== ### Action-String ### ===== --- ===== //
import {
  REGISTER,
  USER_RESET,
  CONTINUE_WITH_GOOGLE,
  LOGIN,
  USERS_RESET,
  SET_USERS,
  UPDATE_USER_ROLE,
  DELETE_USER,
  STADIUMS_RESET,
  MATCHS_RESET,
} from "./ActionStrings";

// ===== --- ===== ### Error-Action ### ===== --- ===== //
import {
  errorResetAction,
  unexpectedErrorAction,
  unexpectedErrorGetUsersAction,
  unexpectedErrorApproveUserAction,
  unexpectedErrorDeleteUserAction,
} from "./ErrorActions";

// ===== --- ===== ### User-APIs ### ===== --- ===== //
import {
  ApproveUserAPI,
  ContinueWithGoogleAPI,
  DeleteUserAPI,
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

export const ApproveUserAction = (token, id) => async (dispatch) => {
  const res = await ApproveUserAPI(token, id);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    console.log({ ResponseError: res });
    dispatch(unexpectedErrorApproveUserAction(message));

    dispatch({
      type: USERS_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());

    await dispatch({
      type: UPDATE_USER_ROLE,
      payload: id,
    });

    return true;
  }
};

export const DeleteUserAction = (token, id) => async (dispatch) => {
  const res = await DeleteUserAPI(token, id);

  if (Math.floor(res.status / 100) !== 2) {
    console.log("HERE ERROR");
    let message = res.response.data.message;
    console.log({ ResponseError: res });
    dispatch(unexpectedErrorDeleteUserAction(message));

    dispatch({
      type: USERS_RESET,
      payload: {},
    });

    return false;
  } else {
    console.log("HERE DONE");

    dispatch(errorResetAction());

    await dispatch({
      type: DELETE_USER,
      payload: id,
    });

    return true;
  }
};

export const LogoutAction = () => async (dispatch) => {
  dispatch({
    type: USERS_RESET,
  });

  dispatch({
    type: USER_RESET,
  });

  dispatch({
    type: STADIUMS_RESET,
  });

  dispatch({
    type: MATCHS_RESET,
  });
};
