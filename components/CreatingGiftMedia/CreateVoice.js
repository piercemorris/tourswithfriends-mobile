import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

import Title from "../UI/Title";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const CreateVoice = ({ mediaRef, returnMediaRef, navigation }) => {
  [audioPemission, setAudioPermission] = useState(false);
  [isRecording, setIsRecording] = useState(false);
  [isLoading, setIsLoading] = useState(false);
  [recording, setRecording] = useState(null);
  [sound, setSound] = useState(null);

  useEffect(() => {
    _askForAudioPermissions();
  }, []);

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
        isLooping: true
      },
      _updateScreenForSoundStatus
    );

    setSound(newSound.sound);
    setIsLoading(false);
  };

  const _stopPlaybackAndBeginRecording = async () => {
    setIsRecording(true);
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
    } else {
    }
  };

  const _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      setIsRecording(status.isRecording);
    } else if (status.isDoneRecording) {
      setIsRecording(false);
      if (!isLoading) {
        _stopRecordingAndEnablePlayback();
      }
    }
  };

  const _onRecordPressed = () => {
    if (isRecording) {
      _stopRecordingAndEnablePlayback();
    } else {
      _stopPlaybackAndBeginRecording();
    }
  };

  const _onPlayPausePressed = () => {
    sound.playAsync();
  };

  return (
    <View>
      <Title style={styles.title} title={selectedMethod} />
      <TouchableHighlight onPress={() => _onRecordPressed()}>
        <Ionicons name="ios-play" size={32} color={Colors.primary} />
      </TouchableHighlight>
      <TouchableHighlight onPress={() => _onPlayPausePressed()}>
        <Ionicons name="ios-play" size={32} color={Colors.primary} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreateVoice;
