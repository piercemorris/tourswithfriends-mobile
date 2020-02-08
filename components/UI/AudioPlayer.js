import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import { msToFormattedSecs } from "../../helper/reusableFunctions";

const AudioPlayer = ({
  isPlaying,
  duration,
  position,
  onPlayPausePressed,
  onResetSound
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPlayPausePressed()}>
        <Ionicons
          name={isPlaying ? "ios-pause" : "ios-play"}
          size={48}
          color={Colors.secondary}
        />
      </TouchableOpacity>
      <Text style={styles.duration}>{`${msToFormattedSecs(
        position
      )}/${msToFormattedSecs(duration)}`}</Text>
      <TouchableOpacity onPress={() => onResetSound()}>
        <Ionicons name="ios-refresh" size={42} color={Colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  duration: {
    marginHorizontal: 5,
    fontFamily: "sf-bold",
    fontSize: 22,
    width: 100,
    textAlign: "center"
  }
});

export default AudioPlayer;
