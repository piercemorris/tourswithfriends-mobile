import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = props => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Ionicons {...props} size={32} />
    </TouchableOpacity>
  );
};

export default IconButton;
