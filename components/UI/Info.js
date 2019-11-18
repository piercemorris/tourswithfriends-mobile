import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import StyledText from "../StyledText";

const Info = props => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={Platform.OS === "ios" ? "ios-warning" : "md-warning"}
        size={26}
        style={styles.icon}
        color={Colors.white}
      />
      <StyledText style={styles.text} bold>
        {props.text}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  icon: {
    fontSize: 42,
    marginLeft: 30
  },
  text: {
    color: Colors.white,
    flexShrink: 1
  }
});

export default Info;
