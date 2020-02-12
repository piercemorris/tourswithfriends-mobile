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

const CircleButton = props => {
  let Wrapper =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  if (props.disabled === true) {
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
    ...Layout.shadow,
    borderColor: Colors.primary,
    borderWidth: 5,
    height: Layout.window.width / 4,
    width: Layout.window.width / 4,
    borderRadius: Layout.window.width / 8,
    justifyContent: "center",
    alignItems: "center"
  },
  gradient: {
    height: Layout.window.width / 5,
    width: Layout.window.width / 5,
    borderRadius: Layout.window.width / 10,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    padding: 0,
    fontSize: 18,
    textAlign: "center",
    color: Colors.white
  }
});

export default CircleButton;
