// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import {
  CREATE_MATCH,
  GET_HOME_MATCHS,
  GET_ALL_MATCHS,
  MATCHS_RESET,
} from "../Actions/ActionStrings";

// ===== --- ===== ### Match-Reducer ### ===== --- ===== //
const matchReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_MATCHS:
      return action.payload;

    case CREATE_MATCH:
      state.push(action.payload);
      state.sort(function (a, b) {
        return new Date(a.matchDate) - new Date(b.matchDate);
      });
      return state;

    case MATCHS_RESET:
      return [];

    default:
      return state;
  }
};

export default matchReducer;
