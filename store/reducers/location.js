import {
  UPDATE_FRIEND_DETAILS,
  UPDATE_TOUR_DETAILS,
  UPDATE_LOCATION_ONE,
  UPDATE_LOCATION_TWO,
  UPDATE_LOCATION_THREE,
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
  switch (action.type) {
    case SEND_GIFT:
      return { ...state };
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
          address: action.address,
          mediaType: action.mediaType,
          mediaFileRef: action.mediaFileRef
        }
      };
    case UPDATE_LOCATION_TWO:
      return {
        ...state,
        locationTwo: {
          name: action.name,
          location: action.location,
          address: action.address,
          mediaType: action.mediaType,
          mediaFileRef: action.mediaFileRef
        }
      };
    case UPDATE_LOCATION_THREE:
      return {
        ...state,
        locationThree: {
          name: action.name,
          location: action.location,
          address: action.address,
          mediaType: action.mediaType,
          mediaFileRef: action.mediaFileRef
        }
      };
    default:
      return initialState;
  }
};
