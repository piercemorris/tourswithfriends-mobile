import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import AudioPlayer from "../../components/UI/AudioPlayer";

const AudioRevealScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);

  const _onSeekSliderValueChanged = () => {};

  const _onPlayPausedPressed = () => {};

  const _onResetSound = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Audio Message" />
        <AudioPlayer
          isPlaying={isPlaying}
          duration={duration}
          position={position}
          onSeekSliderValueChanged={_onSeekSliderValueChanged}
          onPlayPausePressed={_onPlayPausedPressed}
          onResetSound={_onResetSound}
        />
      </View>
      <Button onPress={() => {}}>Completed!</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default AudioRevealScreen;
