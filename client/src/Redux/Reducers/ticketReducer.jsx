// ===== --- ===== ### Action-Strings ### ===== --- ===== //
import { GET_ALL_TICKETS, TICKETS_RESET } from "../Actions/ActionStrings";

// ===== --- ===== ### Ticket-Reducer ### ===== --- ===== //
const ticketReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_TICKETS:
      return action.payload;

    case TICKETS_RESET:
      return [];

    default:
      return state;
  }
};

export default ticketReducer;
