import Firebase from "firebase";

export const ADD_FRIEND = "ADD_FRIEND";

const getCurrentFriendList = uid => {
  return Firebase.database()
    .ref(`users/${uid}/recent`)
    .once("value");
};

export const addFriend = friendUID => {
  return async dispatch => {
    const currentUser = Firebase.auth().currentUser;

    if (currentUser) {
      const currentFriendList = (
        await getCurrentFriendList(currentUser.uid)
      ).val();

      console.log(`Current friendlist => ${currentFriendList}`);

      if (currentFriendList) {
      }
    }
  };
};
