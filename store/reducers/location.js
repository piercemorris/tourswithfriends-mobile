import {
  UPDATE_FRIEND_DETAILS,
  UPDATE_TOUR_DETAILS,
  UPDATE_LOCATION_ONE,
  UPDATE_LOCATION_TWO,
  UPDATE_LOCATION_THREE,
  UPDATE_IMAGE_ONE,
  UPDATE_IMAGE_TWO,
  UPDATE_IMAGE_THREE,
  SEND_GIFT
} from "../actions/location";

const initialState = {
  friendDetails: null,
  tourDetails: null,
  locationOne: null,
  locationTwo: null,
  locationThree: null
};

export default (state = initialState, action) => {
  console.log(action.type);
  console.log(state);
  switch (action.type) {
    case SEND_GIFT:
      return { ...initialState };
    case UPDATE_FRIEND_DETAILS:
      return {
        ...state,
        friendDetails: {
          name: action.name,
          email: action.email,
          description: action.description
        }
      };
    case UPDATE_TOUR_DETAILS:
      return {
        ...state,
        tourDetails: {
          title: action.title,
          city: action.city,
          description: action.description,
          start: action.start
        }
      };
    case UPDATE_LOCATION_ONE:
      return {
        ...state,
        locationOne: {
          name: action.name,
          location: action.location,
          address: action.address
        }
      };
    case UPDATE_LOCATION_TWO:
      return {
        ...state,
        locationTwo: {
          name: action.name,
          location: action.location,
          address: action.address
        }
      };
    case UPDATE_LOCATION_THREE:
      return {
        ...state,
        locationThree: {
          name: action.name,
          location: action.location,
          address: action.address
        }
      };
    case UPDATE_IMAGE_ONE:
      return {
        ...state,
        locationOne: {
          ...state.locationOne,
          image: action.image,
          clue: action.clue
        }
      };
    case UPDATE_IMAGE_TWO:
      return {
        ...state,
        locationTwo: {
          ...state.locationTwo,
          image: action.image,
          clue: action.clue
        }
      };
    case UPDATE_IMAGE_THREE:
      return {
        ...state,
        locationThree: {
          ...state.locationThree,
          image: action.image,
          clue: action.clue
        }
      };
    default:
      return initialState;
  }
};
