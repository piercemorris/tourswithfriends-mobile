import { 
  RECEIVE_GIFTS,
  RECEIVE_GIFT, 
  LOADING_GIFTS,
  LOADING_GIFT 
} from "../actions/received";

const initialState = { receivedGifts: null, loadingGifts: null, currentGift: null, loadingGift: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GIFT: return {
        ...state,
        currentGift: action.payload,
        loadingGift: false
      };
    case RECEIVE_GIFTS:
      return {
        ...state,
        receivedGifts: action.payload,
        loadingGifts: false
      };
      case LOADING_GIFT: return {
        ...state,
        loadingGift: true
      }
    case LOADING_GIFTS:
      return {
        ...state,
        loadingGifts: true
      };
    default:
      return state;
  }
};
