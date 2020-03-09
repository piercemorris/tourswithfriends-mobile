import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import AudioPlayer from "../../components/UI/AudioPlayer";

import * as receivedActions from "../../store/actions/received";

const AudioRevealScreen = props => {
  const [id] = useState(props.navigation.getParam("id"));
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();

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
  };

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
  };

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

  const _handleComplete = () => {
    switch (id) {
      case 1:
        dispatch(receivedActions.completedLocation(1));
        break;
      case 2:
        dispatch(receivedActions.completedLocation(2));
        break;
      case 3:
        dispatch(receivedActions.completedLocation(3));
        break;
      default:
        break;
    }
    props.navigation.pop(3);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Audio Message" />
        <StyledText>
          You're friend has recorded this special audio message with you in
          mind. Look at the target location and understand why they've picked
          this place, for you.
        </StyledText>
        {sound ? (
          <AudioPlayer
            isPlaying={isPlaying}
            duration={duration}
            position={position}
            onSeekSliderValueChanged={_onSeekSliderValueChanged}
            onSeekSliderComplete={_onSeekSliderCompleted}
            onPlayPausePressed={_onPlayPausedPressed}
            onResetSound={_onResetSound}
          />
        ) : null}
        <StyledText>
          Once you've finished listening, press the button below and complete
          this tour location.
        </StyledText>
      </View>
      <Button onPress={_handleComplete}>Completed!</Button>
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
