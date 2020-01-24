import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const LargeButton = props => {
  if (props.disabled) {
    return <View style={styles.disabled}></View>;
  }

  return <TouchableOpacity style={styles.container}></TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.primary,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15
  },
  disabled: {}
});

export default LargeButton;
