import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const StatText = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.number}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10
  },
  number: {
    fontSize: 26,
    color: Colors.secondary,
    fontFamily: "sf-regular",
    margin: 5
  },
  text: {
    fontFamily: "sf-bold",
    fontSize: 18
  }
});

export default StatText;
