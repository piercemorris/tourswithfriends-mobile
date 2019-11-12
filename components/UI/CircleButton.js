import React from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StyledText from "../StyledText";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

let Wrapper =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const CircleButton = props => {
  if (props.disabled) {
    Wrapper = View;
  }

  return (
    <Wrapper
      style={{ ...styles.container, ...props.style }}
      onPress={props.onPress}
    >
      <View style={{ ...styles.viewContainer, ...props.viewStyle }}>
        <LinearGradient
          style={styles.gradient}
          colors={
            !props.disabled
              ? [Colors.primary, Colors.secondary]
              : [Colors.lightGrey, Colors.lightGrey]
          }
        >
          <StyledText bold style={styles.text}>
            {props.children}
          </StyledText>
        </LinearGradient>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.shadow
  },
  viewContainer: {
    padding: 20
  },
  gradient: {
    height: Layout.window.width / 3,
    width: Layout.window.width / 3,
    borderRadius: Layout.window.width / 6,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    padding: 0,
    fontSize: 20,
    textAlign: "center",
    color: Colors.white
  }
});

export default CircleButton;
