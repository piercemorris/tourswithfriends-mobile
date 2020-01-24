import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "firebase";

import * as receivedActions from "../store/actions/received";

import Colors from "../constants/Colors";

const InitialScreen = props => {
  const dispatch = useDispatch();
  const receivedGifts = useSelector(store => store.received.receivedGifts);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(receivedActions.receiveGifts());
      setUser(null);
    }

    if (receivedGifts) {
      props.navigation.navigate("Main");
    }
  }, [user, receivedGifts]);

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        props.navigation.navigate("Auth");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default InitialScreen;
