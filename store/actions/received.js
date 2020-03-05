import Firebase from "firebase";
import links from "../../https/index";
import * as FileSystem from "expo-file-system";

export const RECEIVE_GIFT = "RECEIVE_GIFT";
export const RECEIVE_GIFTS = "RECEIVE_GIFTS";
export const LOADING_GIFT = "LOADING_GIFT";
export const LOADING_GIFTS = "LOADING_GIFTS";
export const LOADING_GIFT_STATUS = "LOADING_GIFT_STATUS";
export const LOADING_GIFT_FAIL = "LOADING_GIFT_FAIL";
export const LOADING_GIFTS_FAIL = "LOADING_GIFTS_FAIL";
export const COMPLETED_LOCATION = "COMPLETED_LOCATION";
export const RESET_RECEIVED_GIFT = "RESET_RECEIVED_GIFT";
export const RESET_TOUR = "RESET_TOUR";

import { allProgress } from "../../helper/promiseAllCallback";

export const completedLocation = locationId => {
  return dispatch => {
    dispatch({
      type: COMPLETED_LOCATION,
      id: locationId
    });
  };
};

export const resetReceivedGift = () => {
  return dispatch => {
    dispatch({
      type: RESET_RECEIVED_GIFT
    });
  };
};

export const resetTour = () => {
  return dispatch => {
    dispatch({
      type: RESET_TOUR
    })
  }
}

export const receiveGift = giftId => {
  return async dispatch => {
    dispatch({ type: LOADING_GIFT });

    const currentUser = await Firebase.auth().currentUser;

    if (currentUser) {
      const giftRef = Firebase.database().ref(
        `users/${currentUser.uid}${links.received}/${giftId}`
      );

      giftRef
        .once("value")
        .then(async snapshot => {

          const localFileUrls = await allProgress([
            FileSystem.downloadAsync(
              snapshot.val().locationOne.image,
              `${FileSystem.cacheDirectory}locationOneImage.jpg`
            ).then(res => res.uri),
            FileSystem.downloadAsync(
              snapshot.val().locationOne.image,
              `${FileSystem.cacheDirectory}locationTwoImage.jpg`
            ).then(res => res.uri),
            FileSystem.downloadAsync(
              snapshot.val().locationOne.image,
              `${FileSystem.cacheDirectory}locationThreeImage.jpg`
            ).then(res => res.uri),
            FileSystem.downloadAsync(
              snapshot.val().locationOne.audio,
              `${FileSystem.cacheDirectory}locationOneAudio.mp3`
            ).then(res => res.uri),
            FileSystem.downloadAsync(
              snapshot.val().locationOne.audio,
              `${FileSystem.cacheDirectory}locationTwoAudio.mp3`
            ).then(res => res.uri),
            FileSystem.downloadAsync(
              snapshot.val().locationOne.audio,
              `${FileSystem.cacheDirectory}locationThreeAudio.mp3`
            ).then(res => res.uri)
          ],
            percent => dispatch({
              type: LOADING_GIFT_STATUS,
              percent: percent
            })
          );


          dispatch({
            type: RECEIVE_GIFT,
            payload: {
              ...snapshot.val(),
              locationOne: {
                ...snapshot.val().locationOne,
                image: localFileUrls[0],
                audio: localFileUrls[3]
              },
              locationTwo: {
                ...snapshot.val().locationTwo,
                image: localFileUrls[1],
                audio: localFileUrls[4]
              },
              locationThree: {
                ...snapshot.val().locationThree,
                image: localFileUrls[2],
                audio: localFileUrls[5]
              }
            }
          });
        })
        .catch((ex) => {
          console.log(ex);
          console.log("LOADING GIFTS FAILED?")
          dispatch({
            type: LOADING_GIFT_FAIL
          })
        }
        );
    } else {
      dispatch({
        type: LOADING_GIFT_FAIL
      });
    }
  };
};

export const receiveGifts = () => {
  return async dispatch => {
    dispatch({ type: LOADING_GIFTS });

    const currentUser = await Firebase.auth().currentUser;

    let receivedGifts = [];

    if (currentUser) {
      const receivedGiftsRef = Firebase.database().ref(
        "users/" + currentUser.uid + links.received
      );

      receivedGiftsRef
        .once("value")
        .then(snapshot => {
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
        })
        .catch(
          dispatch({
            type: LOADING_GIFTS_FAIL
          })
        );
    } else {
      dispatch({
        type: LOADING_GIFTS_FAIL
      });
    }
  };
};
