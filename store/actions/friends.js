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

      if (currentFriendList) {
        if (!Object.keys(currentFriendList).find(key => key === friendUID)) {
          await addAddFriendToRecents(currentUser.uid, friendUID);
          dispatch({
            type: ADD_FRIEND
          })
        }
      } else {
        await addAddFriendToRecents(currentUser.uid, friendUID);
        dispatch({
          type: ADD_FRIEND
        })
      }
    }
  };
};

export const retrieveFriends = () => {
  return async dispatch => {
    const currentUser = Firebase.auth().currentUser;
    const data = (await getCurrentFriendList(currentUser.uid)).val();

    let friendList = [];
    const friends = Object.entries(data);

    friends.forEach(([key, value]) => {
      friendList.push({
        id: key,
        data: value
      });
    });

    dispatch({
      type: RETRIEVE_FRIENDS,
      payload: friendList
    });
  };
};
