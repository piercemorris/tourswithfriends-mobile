import { AUTHENTICATE } from "../actions/auth";

const initialState = { userId: null, displayName: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.userId,
        displayName: action.displayName
      };
    default:
      return state;
  }
};
