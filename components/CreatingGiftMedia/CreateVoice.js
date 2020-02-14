import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

import AudioPlayer from "../UI/AudioPlayer";
import RecordIcon from "../CreatingGiftMedia/RecordIcon";
import Colors from "../../constants/Colors";

const CreateVoice = ({ mediaRef, returnMediaRef, navigation }) => {
  [audioPemission, setAudioPermission] = useState(false);
  [isRecording, setIsRecording] = useState(false);
  [isPlaying, setIsPlaying] = useState(false);
  [isLoading, setIsLoading] = useState(false);
  [recording, setRecording] = useState(null);
  [sound, setSound] = useState(null);
  [duration, setDuration] = useState(null);
  [position, setPosition] = useState(null);
  [fadeOpacity, setFadeOpacity] = useState(new Animated.Value(0));
  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(fadeOpacity, {
        toValue: 1
      }),
      Animated.timing(fadeOpacity, {
        toValue: 0
      })
    ])
  );

  useEffect(() => {
    _askForAudioPermissions();
  }, []);

  useEffect(() => {
    if (isRecording) {
      animation.start();
    } else {
      animation.stop();
      Animated.timing(fadeOpacity, {
        toValue: 0
      }).start();
    }
  }, [isRecording]);

  _askForAudioPermissions = async () => {
    const response = await Audio.requestPermissionsAsync();
    setAudioPermission(response.status === "granted");
  };

  const _stopRecordingAndEnablePlayback = async () => {
    setIsLoading(true);
    try {
      await recording.stopAndUnloadAsync();
    } catch (err) {
      console.log(err);
    }

    const info = await FileSystem.getInfoAsync(recording.getURI());
    returnMediaRef(info.uri);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true
    });

    const newSound = await recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        progressUpdateIntervalMillis: 1000
      },
      _updateScreenForSoundStatus
    );

    setSound(newSound.sound);
    setIsLoading(false);
  };

  const _stopPlaybackAndBeginRecording = async () => {
    setIsLoading(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true
    });

    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync(
      JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY))
    );
    newRecording.setOnRecordingStatusUpdate(_updateScreenForRecordingStatus);

    await setRecording(newRecording);
    await recording.startAsync();
    setIsLoading(false);
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

  const _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
    } else if (status.isDoneRecording) {
      setIsRecording(false);
      if (!isLoading) {
        _stopRecordingAndEnablePlayback();
      }
    }
  };

  const _onRecordPressed = () => {
    if (isRecording) {
      setIsRecording(false);
      _stopRecordingAndEnablePlayback();
    } else {
      setIsRecording(true);
      _stopPlaybackAndBeginRecording();
    }
  };

  const _onPlayPausePressed = () => {
    if (!isPlaying) {
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
    <View style={styles.container}>
      <View style={styles.audioContainer}>
        {!sound ? (
          <View style={{ flexDirection: "row" }}>
            <Animated.View
              style={{ ...styles.recordingCircle, opacity: fadeOpacity }}
            />
            <TouchableOpacity onPress={() => _onRecordPressed()}>
              <RecordIcon isRecording={isRecording} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <AudioPlayer
              isPlaying={isPlaying}
              duration={duration}
              position={position}
              onPlayPausePressed={_onPlayPausePressed}
              onResetSound={_onResetSound}
            />
            <TouchableOpacity onPress={() => setSound(null)}>
              <Text style={styles.textButton}>Retake?</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    borderRadius: 15
  },
  recordingCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary
  },
  textButton: {
    fontFamily: "sf-bold",
    fontSize: 18,
    color: Colors.secondary
  }
});

export default CreateVoice;
