import { ADD_FRIEND, RETRIEVE_FRIENDS } from "../actions/friends";

const initialState = {
  friendList: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FRIEND:
      return { ...state }; // CHANGE
    case RETRIEVE_FRIENDS:
      return {
        ...state,
        friendList: action.payload
      };
    default:
      return state;
  }
};
