import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const BackButton = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.pop()}>
      <Ionicons
        name={
          Platform.OS === "ios" ? "ios-arrow-round-back" : "md-arrow-round-back"
        }
        size={42}
        style={{ marginHorizontal: 20 }}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
