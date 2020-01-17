import Firebase from "firebase";
import links from "../../https/index";

export const RECEIVE_GIFTS = "RECEIVE_GIFTS";

export const receiveGifts = () => {
  return async dispatch => {
    const currentUser = await Firebase.auth().currentUser;

    let receivedGifts = [];

    if (currentUser) {
      const receivedGiftsRef = Firebase.database().ref(
        currentUser.uid + links.received
      );
      receivedGiftsRef.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const gift = {
            id: childSnapshot.key,
            name: childSnapshot.val().tourDetails.title,
            city: childSnapshot.val().tourDetails.city
          };

          receivedGifts.push(gift);
        });

        dispatch({
          type: RECEIVE_GIFTS,
          payload: receivedGifts
        });
      });
    }
  };
};
