import {
  RECEIVE_GIFTS,
  RECEIVE_GIFT,
  LOADING_GIFTS,
  LOADING_GIFT,
  LOADING_GIFTS_FAIL,
  COMPLETED_LOCATION
} from "../actions/received";

const initialState = {
  receivedGifts: null,
  loadingGifts: null,
  currentGift: null,
  loadingGift: null,
  locationOneCompleted: false,
  locationTwoCompleted: false,
  locationThreeCompleted: false,
  control: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
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
            locationOneCompleted: true,
            control: 2
          };
        case 2:
          return {
            ...state,
            locationTwoCompleted: true,
            control: 3
          };
        case 3:
          return {
            ...state,
            locationThreeCompleted: true,
            control: 0
          };
      }
    default:
      return state;
  }
};
