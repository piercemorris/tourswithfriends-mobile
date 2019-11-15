import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  let color = Colors.lightGrey;

  if (props.focused) {
    if (Platform.OS === "android") {
      color = Colors.white;
    } else {
      color = Colors.primary;
    }
  }

  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={color}
    />
  );
}
