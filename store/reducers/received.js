import { RECEIVE_GIFTS } from "../actions/received";

const initialState = { receivedGifts: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GIFTS:
      return {
        ...state,
        receivedGifts: action.payload
      };
    default:
      return state;
  }
};
