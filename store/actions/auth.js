import Firebase from "firebase";

export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = userId => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId
    });
  };
};

export const signUp = (email, password) => {
  return async dispatch => {
    try {
      const { user } = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch(authenticate(user.uid));
    } catch (err) {
      throw err.message;
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const { user } = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      dispatch(authenticate(user.uid));
    } catch (err) {
      throw err.message;
    }
  };
};
