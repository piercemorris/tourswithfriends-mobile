import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const InformationBlock = ({ name, city }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{name}</Text>
      <Text>{city}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.shadow,
    backgroundColor: Colors.primary,
    height: Layout.window.height / 5,
    width: Layout.window.width / 3,
    borderRadius: Layout.radius,
    marginLeft: 15,
    marginBottom: 25,
    marginTop: 10,
    padding: 10
  }
});

export default InformationBlock;
