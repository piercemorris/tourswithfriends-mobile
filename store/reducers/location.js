import {
  UPDATE_FRIEND_DETAILS,
  UPDATE_TOUR_DETAILS,
  UPDATE_LOCATION_ONE,
  UPDATE_LOCATION_TWO,
  UPDATE_LOCATION_THREE,
  UPDATE_IMAGE_ONE,
  UPDATE_IMAGE_TWO,
  UPDATE_IMAGE_THREE,
  UPDATE_AUDIO_ONE,
  UPDATE_AUDIO_TWO,
  UPDATE_AUDIO_THREE,
  SEND_GIFT,
  SEND_GIFT_STATUS,
  SEND_GIFT_ERROR
} from "../actions/location";

const initialState = {
  friendDetails: null,
  tourDetails: null,
  locationOne: null,
  locationTwo: null,
  locationThree: null,
  sendingStatus: null
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SEND_GIFT:
      return { ...initialState };
    case SEND_GIFT_STATUS:
      return { 
        ...state, 
        sendingStatus: action.percent
      }
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
          ...state.locationOne,
          name: action.name,
          location: action.location,
          address: action.address
        }
      };
    case UPDATE_LOCATION_TWO:
      return {
        ...state,
        locationTwo: {
          ...state.locationTwo,
          name: action.name,
          location: action.location,
          address: action.address
        }
      };
    case UPDATE_LOCATION_THREE:
      return {
        ...state,
        locationThree: {
          ...state.locationThree,
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
    case UPDATE_AUDIO_ONE:
      return {
        ...state,
        locationOne: {
          ...state.locationOne,
          audio: action.audio
        }
      };
    case UPDATE_AUDIO_TWO:
      return {
        ...state,
        locationTwo: {
          ...state.locationTwo,
          audio: action.audio
        }
      };
    case UPDATE_AUDIO_THREE:
      return {
        ...state,
        locationThree: {
          ...state.locationThree,
          audio: action.audio
        }
      };
    default:
      return initialState;
  }
};
