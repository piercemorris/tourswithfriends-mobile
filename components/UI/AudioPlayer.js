import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Slider } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import { msToFormattedSecs } from "../../helper/reusableFunctions";
import Layout from "../../constants/Layout";

const AudioPlayer = ({
  isPlaying,
  duration,
  position,
  onSeekSliderValueChanged,
  onSeekSliderComplete,
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
      <Slider
        style={{ flex: 1, marginHorizontal: 15 }}
        value={position / duration}
        minimumTrackTintColor={Colors.secondary}
        onValueChange={() => onSeekSliderValueChanged()}
        onSlidingComplete={position => onSeekSliderComplete(position)}
      />
      <TouchableOpacity onPress={() => onResetSound()}>
        <Ionicons name="ios-refresh" size={42} color={Colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

/**      <Text style={styles.duration}>{`${msToFormattedSecs(
        position
      )}/${msToFormattedSecs(duration)}`}</Text>
 
 */

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 100,
    width: Layout.window.width - 40,
    borderRadius: 15,
    backgroundColor: Colors.inputShade,
    margin: 15,
    paddingHorizontal: 15
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
