import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const SmallTitle = props => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 5
  },
  text: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: "sf-bold",
    paddingLeft: 30,
    justifyContent: "center"
  }
});

export default SmallTitle;
