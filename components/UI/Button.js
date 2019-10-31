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

const Button = props => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.style }}
      onPress={props.onPress}
    >
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.primary, Colors.secondary]}
      >
        <Text style={styles.text}>{props.children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.shadow,
    ...{
      height: 50,
      paddingHorizontal: 20,
      borderRadius: 15
    }
  },
  gradient: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  text: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 18,
    color: Colors.white
  }
});

export default Button;
