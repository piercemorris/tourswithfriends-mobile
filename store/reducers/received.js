import { RECEIVE_GIFTS, LOADING_GIFTS } from "../actions/received";

const initialState = { receivedGifts: null, loadingGifts: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GIFTS:
      return {
        ...state,
        receivedGifts: action.payload,
        loadingGifts: false
      };
    case LOADING_GIFTS:
      return {
        ...state,
        LOADING_GIFTS: true
      };
    default:
      return state;
  }
};
