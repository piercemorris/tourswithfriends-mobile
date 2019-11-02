import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Firebase from "firebase";

import Colors from "../constants/Colors";

const InitialScreen = props => {
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? "Main" : "Auth");
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
