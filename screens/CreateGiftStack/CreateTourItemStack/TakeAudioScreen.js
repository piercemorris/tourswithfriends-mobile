import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TakeAudioScreen = props => {
  return (
    <View style={styles.container}>
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
