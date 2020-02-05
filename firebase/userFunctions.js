import Firebase from "firebase";

export const getDisplayName = () => {
  const user = Firebase.auth().currentUser;

  return Firebase.database()
    .ref(`users/${user.uid}/displayName`)
    .once("value");
};

export const getDisplayNameWithUid = uid => {
  return Firebase.database()
    .ref(`users/${uid}/displayName`)
    .once("value");
};
