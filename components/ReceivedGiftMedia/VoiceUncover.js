import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";

import AudioPlayer from "../UI/AudioPlayer";
import StyledText from "../StyledText";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const VoiceUncover = ({ name, mediaFileRef }) => {
  const [soundObj, setSoundObj] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);

  const _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsLoaded(true);
    }
  };

  const _loadSound = async () => {
    Audio.Sound.createAsync(
      { uri: mediaFileRef },
      {
        progressUpdateIntervalMillis: 1000
      },
      _onPlaybackStatusUpdate,
      true
    ).then(res => setSoundObj(res.sound));
  };

  useEffect(() => {
    _loadSound();
  }, []);

  const onPlayPausePressed = () => {
    console.log(soundObj);
    if (!isPlaying) {
      soundObj.playAsync();
      setIsPlaying(true);
    } else {
      soundObj.pauseAsync();
      setIsPlaying(false);
    }
  };

  const onResetSound = () => {
    if (soundObj) {
      setIsPlaying(true);
      soundObj.replayAsync();
    }
  };

  return (
    <View>
      {soundObj ? (
        <AudioPlayer
          isPlaying={isPlaying}
          duration={duration}
          position={position}
          onPlayPausePressed={onPlayPausePressed}
          onResetSound={onResetSound}
        />
      ) : null}
    </View>
  );
};

export default VoiceUncover;
