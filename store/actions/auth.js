import Firebase from "firebase";

export const AUTHENTICATE = "AUTHENTICATE";

import {
  getDisplayNameWithUid,
  getDisplayName
} from "../../firebase/userFunctions";
import * as url from "../../https/index";

export const authenticate = (userId, displayName) => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      displayName: displayName
    });
  };
};

export const verifyUser = userId => {
  return async dispatch => {
    const displayName = (await getDisplayNameWithUid(userId)).val();

    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      displayName: displayName
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

      dispatch(authenticate(user.uid, displayName));
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

      let displayName = "";
      if (user) {
        displayName = (await getDisplayName()).val();
      }

      dispatch(authenticate(user.uid, displayName));
    } catch (err) {
      throw err.message;
    }
  };
};
