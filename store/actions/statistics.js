import Firebase from "firebase";

export const LOADING_STATS = "LOADING_STATS";
export const LOADING_STATS_SUCCESS = "LOADING_STATS_SUCCESS";
export const LOADING_STATS_FAIL = "LOADING_STATS_FAIL";

export const loadStats = () => {
  return async dispatch => {
    const currentUser = Firebase.auth().currentUser;

    const statsRef = Firebase.database()
      .ref(`users/${currentUser.uid}/stats`)
      .once("value");

    const data = (await statsRef).val();

    if (data) {
      dispatch({
        type: LOADING_STATS_SUCCESS,
        sent: data.giftsSent || 0,
        received: data.giftsReceived || 0
      });
    } else {
      dispatch({
        type: LOADING_STATS_SUCCESS,
        sent: 0,
        received: 0
      });
    }
  };
};
