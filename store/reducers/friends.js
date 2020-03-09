import { ADD_FRIEND } from "../actions/friends";

const initialState = {
  friends: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FRIEND:
      return { ...initialState }; // CHANGE
  }
};
