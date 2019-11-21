import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import StyledText from "../StyledText";

const Wrapper =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const ButtonInverse = props => {
  const color = props.completed ? Colors.complete : Colors.secondary;

  return (
    <Wrapper
      style={
        props.completed
          ? { ...styles.complete, ...props.style }
          : { ...styles.incomplete, ...props.style }
      }
      onPress={props.onPress}
    >
      <View style={{ ...styles.viewContainer, ...props.viewStyle }}>
        <StyledText bold style={{ padding: 0, color }}>
          {props.text}
        </StyledText>
        <Ionicons
          name={
            Platform.OS === "ios" ? "ios-arrow-forward" : "md-arrow-forward"
          }
          size={32}
          color={color}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  complete: {
    ...Layout.buttonContainer,
    ...Layout.shadow,
    borderColor: Colors.complete
  },
  incomplete: {
    ...Layout.buttonContainer,
    ...Layout.shadow,
    borderColor: Colors.secondary
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default ButtonInverse;
