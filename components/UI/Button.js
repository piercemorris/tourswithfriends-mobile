import React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const Wrapper =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const Button = props => {
  return (
    <Wrapper
      style={{ ...styles.container, ...props.style }}
      onPress={props.onPress}
    >
      <View style={props.fill ? { ...styles.fillContainer, ...props.viewStyle } :  { ...styles.viewContainer, ...props.viewStyle }}>
        <LinearGradient
          style={props.fill? styles.fillGradient : styles.gradient}
          colors={[Colors.primary, Colors.secondary]}
        >
          <Text style={styles.text}>{props.children}</Text>
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
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  gradient: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  fillContainer: {
    height: 80,
  },
  fillGradient: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  text: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 18,
    color: Colors.white
  }
});

export default Button;
