import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const MapView = props => {
  return (
    <View style={styles.container}>
      <Text>MapView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.inputShade,
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MapView;
