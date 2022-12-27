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
import { createStadiumAPI } from "../../APIs/StadiumAPI";

// ===== --- ===== ### Stadium-Action ### ===== --- ===== //
export const createStadiumAction = (stadium, token) => async (dispatch) => {
  console.log({ stadium });
  console.log({ token });
  alert("HEREE");

  const res = await createStadiumAPI(stadium, token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    // dispatch(unexpectedErrorAction(message));

    // dispatch({
    //   type: USER_RESET,
    //   payload: {},
    // });

    return false;
  } else {
    // dispatch(errorResetAction());
    // await localStorage.setItem("token", res.data.payload.token);

    // await dispatch({
    //   type: CONTINUE_WITH_GOOGLE,
    //   payload: res.data.payload.user,
    // });

    return true;
  }
};
