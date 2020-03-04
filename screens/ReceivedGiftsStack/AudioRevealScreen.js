import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import AudioPlayer from "../../components/UI/AudioPlayer";

const AudioRevealScreen = props => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    _updateSound();
  }, []);

  const _updateSound = async () => {
    const audio = props.navigation.getParam("audio");
    if (audio) {
      const newSound = await Audio.Sound.createAsync(
        { uri: audio },
        {
          isLooping: false,
          progressUpdateIntervalMillis: 200
        },
        _updateScreenForSoundStatus
      );

      setSound(newSound.sound);
    }
  } 

  const _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
    }

    if (status.isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }

  const _onSeekSliderValueChanged = () => {
    if (sound !== null && !isSeeking) {
      setIsSeeking(true);
      sound.pauseAsync();
    }
  };

  const _onSeekSliderCompleted = async () => {
    if (sound !== null) {
      setIsSeeking(false);
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
    }
  };

  const _onPlayPausedPressed = () => {
    if (!isPlaying) {
      if (position === duration) {
        sound.setPositionAsync(0);
      }
      sound.playAsync();
      setIsPlaying(true);
    } else {
      sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const _onResetSound = () => {
    if (sound) {
      setIsPlaying(true);
      sound.replayAsync();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Audio Message" />
        {sound ? 
          <AudioPlayer
            isPlaying={isPlaying}
            duration={duration}
            position={position}
            onSeekSliderValueChanged={_onSeekSliderValueChanged}
            onSeekSliderComplete={_onSeekSliderCompleted}
            onPlayPausePressed={_onPlayPausedPressed}
            onResetSound={_onResetSound}
          /> : null
        }
      </View>
      <Button onPress={() => props.navigation.pop(3)}>Completed!</Button>
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
