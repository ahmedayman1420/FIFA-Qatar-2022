// ===== --- ===== ### Action-String ### ===== --- ===== //
import { CREATE_STADIUM, GET_STADIUMS, USER_RESET } from "./ActionStrings";

// ===== --- ===== ### Error-Action ### ===== --- ===== //
import {
  errorResetAction,
  unexpectedErrorCreateStadiumAction,
  unexpectedErrorGetStadiumsAction,
} from "./ErrorActions";

// ===== --- ===== ### User-APIs ### ===== --- ===== //
import { createStadiumAPI, getStadiumsAPI } from "../../APIs/StadiumAPI";

// ===== --- ===== ### Stadium-Action ### ===== --- ===== //
export const createStadiumAction = (stadium, token) => async (dispatch) => {
  const res = await createStadiumAPI(stadium, token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorCreateStadiumAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());

    await dispatch({
      type: CREATE_STADIUM,
      payload: res.data.payload.stadium,
    });

    return true;
  }
};

export const getStadiumsAction = () => async (dispatch) => {
  const res = await getStadiumsAPI();

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorGetStadiumsAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());

    await dispatch({
      type: GET_STADIUMS,
      payload: res.data.payload.stadiums,
    });

    return true;
  }
};
