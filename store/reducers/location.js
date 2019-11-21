import {
  UPDATE_ADDRESS,
  UPDATE_LOCATION,
  UPDATE_FRIEND_DETAILS
} from "../actions/location";

const initialState = {
  friendDetails: null,
  locationOne: { location: null, address: null },
  locationTwo: { location: null, address: null },
  locationThree: { location: null, address: null }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FRIEND_DETAILS:
      return {
        ...state,
        friendDetails: {
          name: action.name,
          email: action.email,
          description: action.description
        }
      };
    case UPDATE_ADDRESS:
      switch (action.id) {
        case 1:
          return {
            ...state,
            locationOne: {
              ...state.locationOne,
              address: action.address
            }
          };
        case 2:
          return {
            ...state,
            locationTwo: {
              ...state.locationTwo,
              address: action.address
            }
          };
        case 3:
          return {
            ...state,
            locationThree: {
              ...state.locationThree,
              address: action.address
            }
          };
      }
    case UPDATE_LOCATION:
      switch (action.id) {
        case 1:
          return {
            ...state,
            locationOne: {
              ...state.locationOne,
              location: action.location
            }
          };
        case 2:
          return {
            ...state,
            locationTwo: {
              ...state.locationTwo,
              location: action.location
            }
          };
        case 3:
          return {
            ...state,
            locationThree: {
              ...state.locationThree,
              action: action.location
            }
          };
      }
    default:
      return initialState;
      break;
  }
};
