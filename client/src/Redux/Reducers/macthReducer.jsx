// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import {
  CREATE_MATCH,
  GET_HOME_MATCHS,
  GET_ALL_MATCHS,
  MATCHS_RESET,
  EDIT_MATCH,
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

    case EDIT_MATCH:
      return state.map((match) => {
        if (action.payload._id === match._id) return action.payload;
        else return match;
      });

    case MATCHS_RESET:
      return [];

    default:
      return state;
  }
};

export default matchReducer;
