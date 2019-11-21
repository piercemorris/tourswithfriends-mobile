export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_FRIEND_DETAILS = "UPDATE_FRIEND_DETAILS";

export const updateAddress = (address, id) => {
  return dispatch => {
    dispatch({
      type: UPDATE_ADDRESS,
      id,
      address
    });
  };
};

export const updateLocation = (location, id) => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOCATION,
      id,
      location
    });
  };
};

export const updateFriendDetails = (name, email, description) => {
  return dispatch => {
    dispatch({
      type: UPDATE_FRIEND_DETAILS,
      name,
      email,
      description
    });
  };
};
