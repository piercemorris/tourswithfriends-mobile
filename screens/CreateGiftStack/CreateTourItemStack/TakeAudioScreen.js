import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const TakeAudioScreen = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text>TakeAudioScreen</Text>
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

export default TakeAudioScreen;
