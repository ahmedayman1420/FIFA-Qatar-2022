// ===== --- ===== ### Action-String ### ===== --- ===== //
import {
  CREATE_MATCH,
  GET_HOME_MATCHS,
  GET_ALL_MATCHS,
  USER_RESET,
} from "./ActionStrings";

// ===== --- ===== ### Error-Action ### ===== --- ===== //
import {
  errorResetAction,
  unexpectedErrorCreateMatchAction,
} from "./ErrorActions";

// ===== --- ===== ### Match-APIs ### ===== --- ===== //
import {
  createMatchAPI,
  getAllMatchesAPI,
  getHomeMatchesAPI,
} from "../../APIs/MatchAPI";

// ===== --- ===== ### Match-Action ### ===== --- ===== //
export const createMatchAction = (match, token) => async (dispatch) => {
  const res = await createMatchAPI(match, token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorCreateMatchAction(message));

    return false;
  } else {
    dispatch(errorResetAction());
    var date = new Date();
    let today =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    // console.log({ matchDate: match.matchDate });
    // console.log({ today });

    // console.log({ matchTime: match.matchTime });
    // console.log({ Hours: date.getHours() });

    // console.log(match.matchDate >= today && match.matchTime > date.getHours());

    if (match.matchDate >= today && match.matchTime > date.getHours()) {
      await dispatch({
        type: CREATE_MATCH,
        payload: res.data.payload.match,
      });
    }
    return true;
  }
};

export const getHomeMatchesAction = () => async (dispatch) => {
  const res = await getHomeMatchesAPI();

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorCreateMatchAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());

    await dispatch({
      type: GET_HOME_MATCHS,
      payload: res.data.payload.matches,
    });

    return true;
  }
};

export const getAllMatchesAction = () => async (dispatch) => {
  const res = await getAllMatchesAPI();

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorCreateMatchAction(message));

    dispatch({
      type: USER_RESET,
      payload: {},
    });

    return false;
  } else {
    dispatch(errorResetAction());

    await dispatch({
      type: GET_ALL_MATCHS,
      payload: res.data.payload.matches.sort(function (a, b) {
        return new Date(a.matchDate) - new Date(b.matchDate);
      }),
    });

    return true;
  }
};
