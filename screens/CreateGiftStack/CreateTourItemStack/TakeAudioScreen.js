import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, StatusBar, Alert } from "react-native";

import Header from "../../../components/UI/Header";
import Button from "../../../components/UI/Button";
import CreateVoice from "../../../components/CreatingGiftMedia/CreateVoice";

import * as locationActions from "../../../store/actions/location";

const TakeAudioScreen = props => {
  const _updateSavedData = locationId => {
    switch (locationId) {
      case 1:
        return useSelector(store => store.gift.locationOne);
      case 2:
        return useSelector(store => store.gift.locationTwo);
      case 3:
        return useSelector(store => store.gift.locationThree);
    }
  };

  const dispatch = useDispatch();
  const [id] = useState(props.navigation.getParam("id"));
  const [savedData] = useState(_updateSavedData(id));
  const [error, setError] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(
    savedData ? savedData.audio : null
  );

  const _returnAudio = audio => {
    setSelectedAudio(audio);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", "Not all fields have been completed", {
        text: "Ok"
      });
    }
    setError(false);
  });

  const _handleNext = () => {
    if (selectedAudio) {
      console.log(selectedAudio);
      dispatch(locationActions.updateAudio(id, selectedAudio));
      props.navigation.pop(2);
      props.navigation.pop();
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Header style={{ marginBottom: 10 }} title="Audio message" />
        <View style={styles.audioContainer}>
          <CreateVoice
            audioRef={selectedAudio ? selectedAudio : null}
            returnMediaRef={_returnAudio}
          />
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
