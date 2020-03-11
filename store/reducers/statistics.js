import { LOADING_STATS_SUCCESS } from "../actions/statistics";

const initialState = {
  sent: null,
  received: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STATS_SUCCESS:
      return {
        ...state,
        sent: action.sent,
        received: action.received
      };
    default:
      return state;
  }
};
