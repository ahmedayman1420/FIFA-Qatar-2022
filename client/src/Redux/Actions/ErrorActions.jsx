// ===== --- ===== ### Action-String ### ===== --- ===== //
import { ERROR_RESET, UNEXPECTED_ERROR } from "./ActionStrings";

// ===== --- ===== ### Error-Actions ### ===== --- ===== //
export const unexpectedErrorAction = (mes) => async (dispatch) => {
  dispatch({
    type: UNEXPECTED_ERROR,
    payload: { value: true, message: mes, type: "auth" },
  });
};

export const unexpectedErrorGetUsersAction = (mes) => async (dispatch) => {
  dispatch({
    type: UNEXPECTED_ERROR,
    payload: { value: true, message: mes, type: "getUsers" },
  });
};

export const unexpectedErrorApproveUserAction = (mes) => async (dispatch) => {
  dispatch({
    type: UNEXPECTED_ERROR,
    payload: { value: true, message: mes, type: "ApproveUser" },
  });
};

export const unexpectedErrorDeleteUserAction = (mes) => async (dispatch) => {
  dispatch({
    type: UNEXPECTED_ERROR,
    payload: { value: true, message: mes, type: "DeleteUser" },
  });
};

export const errorResetAction = () => async (dispatch) => {
  dispatch({
    type: ERROR_RESET,
    payload: { value: false, message: "", type: "" },
  });
};
