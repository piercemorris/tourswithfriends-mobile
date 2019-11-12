export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_LOCATION = "UPDATE_LOCATION";

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
