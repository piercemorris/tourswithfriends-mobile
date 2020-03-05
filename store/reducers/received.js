import {
  RECEIVE_GIFTS,
  RECEIVE_GIFT,
  LOADING_GIFTS,
  LOADING_GIFT,
  LOADING_GIFT_STATUS,
  LOADING_GIFTS_FAIL,
  COMPLETED_LOCATION,
  LOADING_GIFT_FAIL,
  RESET_RECEIVED_GIFT,
  RESET_TOUR,
} from "../actions/received";

const initialState = {
  receivedGifts: null,
  loadingGifts: null,
  currentGift: null,
  loadingGift: null,
  loadingGiftStatus: null,
  control: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_RECEIVED_GIFT:
      return {
        ...state,
        currentGift: null
      };
    case RECEIVE_GIFT:
      return {
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
    case LOADING_GIFT:
      return {
        ...state,
        loadingGift: true
      };
    case LOADING_GIFTS:
      return {
        ...state,
        loadingGifts: true
      };
      case LOADING_GIFT_STATUS:
        return {
          ...state,
          loadingGiftStatus: action.percent
        }
    case LOADING_GIFT_FAIL:
      return {
        ...state,
        loadingGift: false
      };
    case LOADING_GIFTS_FAIL:
      return {
        ...state,
        loadingGifts: false,
        receivedGifts: []
      };
    case COMPLETED_LOCATION:
      switch (action.id) {
        case 1:
          return {
            ...state,
            control: 2
          };
        case 2:
          return {
            ...state,
            control: 3
          };
        case 3:
          return {
            ...state,
            control: 4
          };
      }
    case RESET_TOUR:
      return {
        ...state,
        control: 1
      }
    default:
      return state;
  }
};
