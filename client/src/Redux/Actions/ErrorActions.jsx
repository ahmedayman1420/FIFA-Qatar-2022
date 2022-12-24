// ===== --- ===== ### Action-String ### ===== --- ===== //
import { ERROR_RESET, UNEXPECTED_ERROR } from "./ActionStrings";

// ===== --- ===== ### Error-Actions ### ===== --- ===== //
export const unexpectedErrorAction = (mes) => async (dispatch) => {
  dispatch({
    type: UNEXPECTED_ERROR,
    payload: { value: true, message: mes, type: "auth" },
  });
};

export const errorResetAction = () => async (dispatch) => {
  dispatch({
    type: ERROR_RESET,
    payload: { value: false, message: "", type: "" },
  });
};
