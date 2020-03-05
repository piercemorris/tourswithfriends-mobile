import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "./Title";
import Colors from "../../constants/Colors";

const InputContainer = props => {
  return (
    <View style={styles.container}>
      <Title title={props.title} />
      <View style={styles.textContainer}>
        <Text>{props.text}</Text>
        <Ionicons name="ios-color-wand" size={32} color={Colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 5
  },
  text: {
    fontFamily: "sf-regular",
    fontSize: 16
  }
});

export default InputContainer;
