import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Platform } from "react-native";

import Colors from "../../constants/Colors";

const Header = props => {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingTop: props.main ? 15 : -10,
        ...props.style
      }}
    >
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 36
  },
  subtitle: {
    fontFamily: Platform.OS === "ios" ? "sf-bold" : "roboto-bold",
    fontSize: 20,
    color: Colors.grey
  }
});

export default Header;
