import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TakeImageScreen = props => {
  return (
    <View style={styles.container}>
      <Text>TakeImageScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TakeImageScreen;
