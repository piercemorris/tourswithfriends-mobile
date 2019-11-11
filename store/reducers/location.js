import { UPDATE_ADDRESS, UPDATE_LOCATION } from "../actions/location";

const initialState = {
  location_one: { location: null, address: null },
  location_two: { location: null, address: null },
  location_three: { location: null, address: null }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS:
      switch (action.id) {
        case 1:
          return {
            ...state,
            location_one: {
              ...state.location_one,
              ...action.address
            }
          };
        case 2:
          return {
            ...state,
            location_two: {
              ...state.location_two,
              ...action.address
            }
          };
        case 3:
          return {
            ...state,
            location_three: {
              ...state.location_three,
              ...action.address
            }
          };
      }
    case UPDATE_LOCATION:
      switch (action.id) {
        case 1:
          return {
            ...state,
            location_one: {
              ...state.location_one,
              ...action.location
            }
          };
        case 2:
          return {
            ...state,
            location_two: {
              ...state.location_two,
              ...action.location
            }
          };
        case 3:
          return {
            ...state,
            location_three: {
              ...state.location_three,
              ...action.location
            }
          };
      }
  }
};
