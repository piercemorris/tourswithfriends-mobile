import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const BackButton = props => {
  const os = Platform.OS;

  let icon = os === "ios" ? "ios-arrow-back" : "md-arrow-back";
  if (props.close) {
    icon = os === "ios" ? "ios-close" : "md-close";
  }

  return (
    <TouchableOpacity
      onPress={props.onPress ? props.onPress : () => props.navigation.pop()}
    >
      <Ionicons
        name={icon}
        size={42}
        style={{ marginHorizontal: 20, marginTop: 5 }}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
