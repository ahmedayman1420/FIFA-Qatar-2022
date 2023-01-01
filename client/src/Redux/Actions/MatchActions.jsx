// ===== --- ===== ### Action-String ### ===== --- ===== //
import {
  CREATE_MATCH,
  GET_HOME_MATCHS,
  GET_ALL_MATCHS,
  USER_RESET,
  EDIT_MATCH,
  GET_ALL_TICKETS,
} from "./ActionStrings";

// ===== --- ===== ### Error-Action ### ===== --- ===== //
import {
  errorResetAction,
  unexpectedErrorCreateMatchAction,
} from "./ErrorActions";

// ===== --- ===== ### Match-APIs ### ===== --- ===== //
import {
  createMatchAPI,
  deleteTicketAPI,
  editMatchAPI,
  getAllMatchesAPI,
  getAllTicketsAPI,
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

    if (match.matchDate > today) {
      await dispatch({
        type: CREATE_MATCH,
        payload: res.data.payload.match,
      });
    } else if (match.matchDate === today && match.matchTime > date.getHours()) {
      await dispatch({
        type: CREATE_MATCH,
        payload: res.data.payload.match,
      });
    }
    return true;
  }
};

export const editMatchAction = (match, token) => async (dispatch) => {
  const res = await editMatchAPI(match, token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;
    dispatch(unexpectedErrorCreateMatchAction(message));

    return false;
  } else {
    dispatch(errorResetAction());
    dispatch(getAllMatchesAction());
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

export const getAllTicketsAction = (token) => async (dispatch) => {
  const res = await getAllTicketsAPI(token);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;

    return false;
  } else {
    dispatch(errorResetAction());
    await dispatch({
      type: GET_ALL_TICKETS,
      payload: res.data.payload.tickets,
    });

    return true;
  }
};

export const deleteTicketsAction = (token, _id) => async (dispatch) => {
  const res = await deleteTicketAPI(token, _id);

  if (Math.floor(res.status / 100) !== 2) {
    let message = res.response.data.message;

    return false;
  } else {
    dispatch(getAllTicketsAction(token));
    dispatch(getAllMatchesAction());

    return true;
  }
};
