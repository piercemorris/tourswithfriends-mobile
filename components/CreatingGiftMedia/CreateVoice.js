import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

import Title from "../UI/Title";
import RecordIcon from "../CreatingGiftMedia/RecordIcon";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { msToFormattedSecs } from "../../helper/reusableFunctions";

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
    console.log(status);
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
      //setIsRecording(status.isRecording);
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
      <Title style={styles.title} title={selectedMethod} />
      <View style={styles.audioContainer}>
        <View style={{ flexDirection: "row" }}>
          <Animated.View
            style={{ ...styles.recordingCircle, opacity: fadeOpacity }}
          />
          <TouchableOpacity onPress={() => _onRecordPressed()}>
            <RecordIcon isRecording={isRecording} />
          </TouchableOpacity>
        </View>
        {sound && (
          <View style={styles.soundContainer}>
            <TouchableOpacity onPress={() => _onPlayPausePressed()}>
              <Ionicons
                name={isPlaying ? "ios-pause" : "ios-play"}
                size={48}
                color={Colors.secondary}
              />
            </TouchableOpacity>
            <Text style={styles.duration}>{`${msToFormattedSecs(
              position
            )}/${msToFormattedSecs(duration)}`}</Text>
            <TouchableOpacity onPress={() => _onResetSound()}>
              <Ionicons name="ios-refresh" size={42} color={Colors.secondary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  audioContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputShade,
    marginHorizontal: 25,
    marginVertical: 15,
    borderRadius: 15,
    padding: 20
  },
  recordingCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary
  },
  soundContainer: {
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

export default CreateVoice;
