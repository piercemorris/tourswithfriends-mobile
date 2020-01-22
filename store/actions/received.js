import Firebase from "firebase";
import links from "../../https/index";

export const RECEIVE_GIFT = "RECEIVE_GIFT";
export const RECEIVE_GIFTS = "RECEIVE_GIFTS";
export const LOADING_GIFT = "LOADING_GIFT";
export const LOADING_GIFTS = "LOADING_GIFTS";
export const LOADING_GIFT_FAIL = "LOADING_GIFT_FAIL";
export const LOADING_GIFTS_FAIL = "LOADING_GIFTS_FAIL";

export const receiveGift = giftId => {
  return async dispatch => {
    dispatch({ type: LOADING_GIFT });

    const currentUser = await Firebase.auth().currentUser;

    if (currentUser) {
      const giftRef = Firebase.database().ref(`${currentUser.uid}${links.received}/${giftId}`);

      giftRef.once("value").then(snapshot => {
        dispatch({
          type: RECEIVE_GIFT,
          payload: snapshot.val()
        });
      }).catch(
        dispatch({
          type: LOADING_GIFT_FAIL
        })
      );
    }
  }
}

export const receiveGifts = () => {
  return async dispatch => {
    dispatch({ type: LOADING_GIFTS });

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
            city: childSnapshot.val().tourDetails.city,
            user: childSnapshot.val().sentFrom.name,
            uid: childSnapshot.val().sentFrom.uid
          };

          receivedGifts.push(gift);
        });

        dispatch({
          type: RECEIVE_GIFTS,
          payload: receivedGifts
        });
      }).catch(dispatch({
        type: LOADING_GIFTS_FAIL
      }));
    }
  };
};
