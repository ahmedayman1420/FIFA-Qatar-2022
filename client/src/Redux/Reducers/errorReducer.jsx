// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import { ERROR_RESET, UNEXPECTED_ERROR } from "../Actions/ActionStrings";

// ===== --- ===== ### Error-Reducer ### ===== --- ===== //
const errorReducer = (
  state = { value: false, message: "", type: "" },
  action
) => {
  switch (action.type) {
    case UNEXPECTED_ERROR:
      return action.payload;

    case ERROR_RESET:
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
