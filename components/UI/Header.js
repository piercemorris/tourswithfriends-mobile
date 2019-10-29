import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import Colors from "../../constants/Colors";

const Header = props => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 36,
    paddingTop: 25
  },
  subtitle: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 20,
    color: Colors.grey
  }
});

export default Header;
