import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Input = props => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <TextInput style={styles.input} />
    </View>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 10 },
  titleContainer: {
    height: 30,
    justifyContent: "center"
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: "sf-bold",
    paddingLeft: 10,
    justifyContent: "center"
  },
  input: {
    backgroundColor: Colors.inputShade,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "sf-regular",
    fontSize: 18
  }
});

export default Input;
