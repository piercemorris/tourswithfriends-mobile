import React from "react";
import { Text, Platform } from "react-native";

const StyledText = props => {
  return (
    <Text
      style={{
        ...{
          fontFamily:
            Platform.OS === "ios"
              ? props.bold
                ? "sf-bold"
                : "sf-regular"
              : props.bold
              ? "roboto-bold"
              : "roboto-regular",
          fontSize: 18,
          padding: 20,
          lineHeight: 25
        },
        ...props.style
      }}
    >
      {props.children}
    </Text>
  );
};

export default StyledText;
