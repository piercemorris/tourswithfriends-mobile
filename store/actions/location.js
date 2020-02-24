import Firebase from "firebase";
import axios from "axios";

export const UPDATE_FRIEND_DETAILS = "UPDATE_FRIEND_DETAILS";
export const UPDATE_TOUR_DETAILS = "UPDATE_TOUR_DETAILS";

export const UPDATE_LOCATION_ONE = "UPDATE_LOCATION_ONE";
export const UPDATE_LOCATION_TWO = "UPDATE_LOCATION_TWO";
export const UPDATE_LOCATION_THREE = "UPDATE_LOCATION_THREE";

export const UPDATE_IMAGE_ONE = "UPDATE_IMAGE_ONE";
export const UPDATE_IMAGE_TWO = "UPDATE_IMAGE_TWO";
export const UPDATE_IMAGE_THREE = "UPDATE_IMAGE_THREE";

export const UPDATE_AUDIO_ONE = "UPDATE_AUDIO_ONE";
export const UPDATE_AUDIO_TWO = "UPDATE_AUDIO_TWO";
export const UPDATE_AUDIO_THREE = "UPDATE_AUDIO_THREE";

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

    // get filenames for images and audio
    console.log("Getting filenames");
    const sentByUser = Firebase.auth().currentUser;
    const filenameImageOne = locationOne.image.split("/").pop();
    const filenameImageTwo = locationTwo.image.split("/").pop();
    const filenameImageThree = locationThree.image.split("/").pop();
    const filenameAudioOne = locationOne.audio.split("/").pop();
    const filenameAudioTwo = locationTwo.audio.split("/").pop();
    const filenameAudioThree = locationThree.audio.split("/").pop();

    // wait for all images to upload
    console.log("Uploading assets");
    const downloadUrls = await Promise.all([
      assetOps.uploadAsset(locationOne.image, filenameImageOne, "image"),
      assetOps.uploadAsset(locationOne.audio, filenameAudioOne, "voice"),
      assetOps.uploadAsset(locationTwo.image, filenameImageTwo, "image"),
      assetOps.uploadAsset(locationTwo.audio, filenameAudioTwo, "voice"),
      assetOps.uploadAsset(locationThree.image, filenameImageThree, "image"),
      assetOps.uploadAsset(locationThree.audio, filenameAudioThree, "voice")
    ]);
    console.log("Finished uploading assets");

    const gift = {
      friendDetails,
      tourDetails,
      locationOne: {
        ...locationOne,
        image: downloadUrls[0],
        audio: downloadUrls[1]
      },
      locationTwo: {
        ...locationTwo,
        image: downloadUrls[2],
        audio: downloadUrls[3]
      },
      locationThree: {
        ...locationThree,
        image: downloadUrls[4],
        audio: downloadUrls[5]
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

export const updateImageAndClue = (id, image, clue) => {
  let action;
  if (id === 1) {
    action = UPDATE_IMAGE_ONE;
  } else if (id === 2) {
    action = UPDATE_IMAGE_TWO;
  } else {
    action = UPDATE_IMAGE_THREE;
  }

  return dispatch => {
    dispatch({
      type: action,
      image,
      clue
    });
  };
};

export const updateLocation = (id, name, location, address) => {
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
      address
    });
  };
};

export const updateAudio = (id, audio) => {
  let action;
  if (id === 1) {
    action = UPDATE_AUDIO_ONE;
  } else if (id === 2) {
    action = UPDATE_AUDIO_TWO;
  } else {
    action = UPDATE_AUDIO_THREE;
  }

  return dispatch => {
    dispatch({
      type: action,
      audio
    });
  };
};
