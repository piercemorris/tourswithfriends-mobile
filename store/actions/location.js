import Firebase from "firebase";
import axios from "axios";

export const UPDATE_FRIEND_DETAILS = "UPDATE_FRIEND_DETAILS";
export const UPDATE_TOUR_DETAILS = "UPDATE_TOUR_DETAILS";
export const UPDATE_LOCATION_ONE = "UPDATE_LOCATION_ONE";
export const UPDATE_LOCATION_TWO = "UPDATE_LOCATION_TWO";
export const UPDATE_LOCATION_THREE = "UPDATE_LOCATION_THREE";
export const SEND_GIFT = "SEND_GIFT";
export const SEND_GIFT_ERROR = "SEND_GIFT_ERROR";

import url from "../../https/index";
import * as assetOps from "../../firebase/uploadAsset";
import { getLocationFiletype } from "../../helper/filetypeEnum";

import representationEnum from "../../helper/representationEnum";

export const sendGift = (
  friendDetails,
  tourDetails,
  locationOne,
  locationTwo,
  locationThree
) => {
  return async dispatch => {
    // attempt to create new user else retrieve uid
    let res;
    try {
      res = await axios.post(url.live + "users/create", {
        name: friendDetails.name,
        email: friendDetails.email
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SEND_GIFT_ERROR
      });
    }

    const user = res.data.userId;

    // upload images to storage
    const sentByUser = Firebase.auth().currentUser;
    const filenameOne = locationOne.mediaFileRef.split("/").pop();
    const filenameTwo = locationTwo.mediaFileRef.split("/").pop();
    const filenameThree = locationThree.mediaFileRef.split("/").pop();

    // wait for all images to upload
    const downloadUrls = await Promise.all([
      await assetOps.uploadAsset(
        locationOne.mediaFileRef,
        filenameOne,
        getLocationFiletype(locationOne.mediaType)
      ),
      await assetOps.uploadAsset(
        locationTwo.mediaFileRef,
        filenameTwo,
        getLocationFiletype(locationTwo.mediaType)
      ),
      await assetOps.uploadAsset(
        locationThree.mediaFileRef,
        filenameThree,
        getLocationFiletype(locationThree.mediaType)
      )
    ]);

    const gift = {
      friendDetails,
      tourDetails,
      locationOne: {
        ...locationOne,
        mediaFileRef: downloadUrls[0]
      },
      locationTwo: {
        ...locationTwo,
        mediaFileRef: downloadUrls[1]
      },
      locationThree: {
        ...locationThree,
        mediaFileRef: downloadUrls[2]
      },
      sentFrom: {
        uid: sentByUser.uid,
        name: sentByUser.displayName ? sentByUser.displayName : sentByUser.email
      }
    };

    await Firebase.database()
      .ref(`users/${user}/gifts/`)
      .push(gift);

    await Firebase.database()
      .ref(`users/${user}/stats/giftsReceived`)
      .transaction(val => (val || 0) + 1);

    await Firebase.database()
      .ref(`users/${sentByUser.uid}/stats/giftsSent`)
      .transaction(val => (val || 0) + 1);

    // update to notify the user about a failed gift send then reset

    try {
      res = await axios.post(url.live + "users" + url.GIFT_NOTIF_ENDPOINT, {
        senderUid: sentByUser.uid,
        receiverUid: user
      });
    } catch (err) {
      console.error(err.message);
    }

    dispatch({
      type: SEND_GIFT
    });
  };
};

export const updateFriendDetails = (name, email, description) => {
  return dispatch => {
    dispatch({
      type: UPDATE_FRIEND_DETAILS,
      name,
      email,
      description
    });
  };
};

export const updateTourDetails = (title, city, description, start) => {
  return dispatch => {
    dispatch({
      type: UPDATE_TOUR_DETAILS,
      title,
      city,
      description,
      start
    });
  };
};

export const updateLocation = (
  id,
  name,
  location,
  address,
  mediaType,
  mediaFileRef
) => {
  let action;
  if (id === 1) {
    action = UPDATE_LOCATION_ONE;
  } else if (id === 2) {
    action = UPDATE_LOCATION_TWO;
  } else {
    action = UPDATE_LOCATION_THREE;
  }

  return dispatch => {
    dispatch({
      type: action,
      name,
      location,
      address,
      mediaType,
      mediaFileRef
    });
  };
};
