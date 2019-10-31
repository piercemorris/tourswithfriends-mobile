import { AUTHENTICATE } from "../actions/auth";

const initialState = { userId: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.userId
      };
    default:
      return state;
  }
};
