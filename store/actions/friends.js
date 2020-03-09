import Firebase from "firebase";

export const ADD_FRIEND = "ADD_FRIEND";
export const RETRIEVE_FRIENDS = "RETRIEVE_FRIENDS";

const getCurrentFriendList = uid => {
  return Firebase.database()
    .ref(`users/${uid}/recents`)
    .once("value");
};

const getUserDisplayName = uid => {
  return Firebase.database()
    .ref(`users/${uid}/displayName`)
    .once("value");
};

const addAddFriendToRecents = async (uid, friendUid) => {
  const displayName = (await getUserDisplayName(friendUid)).val();
  return Firebase.database()
    .ref(`users/${uid}/recents/${friendUid}/displayName`)
    .set(displayName);
};

export const addFriend = friendUID => {
  return async dispatch => {
    const currentUser = Firebase.auth().currentUser;

    if (currentUser) {
      const currentFriendList = (
        await getCurrentFriendList(currentUser.uid)
      ).val();
      // returns object array

      if (currentFriendList) {
        // find then check for collision
        await addAddFriendToRecents(currentUser.uid, friendUID);
      } else {
        // add user
        await addAddFriendToRecents(currentUser.uid, friendUID);
      }
    }
  };
};

export const retrieveFriends = () => {
  return async dispatch => {
    const currentUser = Firebase.auth().currentUser;
    const friends = (await getCurrentFriendList(currentUser.uid)).val();

    dispatch({
      type: RETRIEVE_FRIENDS,
      payload: friends
    });
  };
};
