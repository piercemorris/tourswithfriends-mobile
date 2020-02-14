import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import Header from "../../../components/UI/Header";
import Button from "../../../components/UI/Button";
import CreateVoice from "../../../components/CreatingGiftMedia/CreateVoice";

const TakeAudioScreen = props => {
  const [selectedAudio, setSelectedAudio] = useState(null);

  const _returnAudio = audio => {
    setSelectedAudio(audio);
  };

  const _handleNext = () => {
    props.navigation.pop();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Header style={{ marginBottom: 10 }} title="Audio message" />
        <View style={styles.audioContainer}>
          <CreateVoice returnMediaRef={_returnAudio} />
        </View>
      </View>
      <Button fill style={styles.navigationButton} onPress={_handleNext}>
        Completed
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: "space-between"
  },
  mainContainer: {
    flex: 1
  },
  audioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TakeAudioScreen;
