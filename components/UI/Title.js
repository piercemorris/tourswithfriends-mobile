import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Input = props => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: "sf-bold",
    paddingLeft: 10,
    justifyContent: "center"
  }
});

export default Input;
