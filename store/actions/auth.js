import Firebase from "firebase";

export const AUTHENTICATE = "AUTHENTICATE";

import * as url from "../../https/index";

export const authenticate = userId => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId
    });
  };
};

export const signUp = (email, password, displayName) => {
  return async dispatch => {
    try {
      const { user } = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        Firebase.database()
          .ref(`users/${user.uid}/displayName`)
          .set(displayName);
      }

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
