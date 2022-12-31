// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import {
  CREATE_STADIUM,
  GET_STADIUMS,
  STADIUMS_RESET,
} from "../Actions/ActionStrings";

// ===== --- ===== ### Stadium-Reducer ### ===== --- ===== //
const stadiumReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STADIUMS:
      return action.payload;

    case CREATE_STADIUM:
      state.push(action.payload);
      return state;

    case STADIUMS_RESET:
      return [];

    default:
      return state;
  }
};

export default stadiumReducer;
