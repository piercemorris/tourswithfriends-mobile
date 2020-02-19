import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Alert, StyleSheet, StatusBar, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Header from "../../../components/UI/Header";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import CreateImage from "../../../components/CreatingGiftMedia/CreateImage";

import * as locationActions from "../../../store/actions/location";

const TakeImageScreen = props => {
  const _updateSavedData = () => {
    switch (id) {
      case 1:
        return useSelector(store => store.gift.locationOne);
      case 2:
        return useSelector(store => store.gift.locationTwo);
      case 3:
        return useSelector(store => store.gift.locationThree);
    }
  };

  const [savedData] = useState(_updateSavedData());
  const [id] = useState(props.navigation.getParam("id"));
  const [selectedClue, setSelectedClue] = useState(
    savedData ? savedData.clue : null
  );
  const [selectedImage, setSelectedImage] = useState(
    savedData ? savedData.image : null
  );
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", "Not all fields have been completed", {
        text: "Ok"
      });
      setError(false);
    }
  }, [error]);

  const _returnImage = image => {
    setSelectedImage(image);
  };

  const _handleNext = () => {
    if (selectedClue && selectedImage) {
      dispatch(
        locationActions.updateImageAndClue(id, selectedImage, selectedClue)
      );
      props.navigation.navigate("TakeAudio", {
        id: id
      });
    } else {
      setError(true);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <View>
        <Header style={{ marginBottom: 10 }} title="Image & clue" />
        <CreateImage
          imageRef={selectedImage}
          returnImageRef={_returnImage}
          navigation={props.navigation}
        />
        <Input
          id="clue"
          title="Clue"
          multiline={true}
          numberOfLines={3}
          defaultValue={selectedClue}
          onInputChange={(id, value, valid) => setSelectedClue(value)}
          returnKeyType="done"
          blurOnSubmit={true}
          placeholder="Give your friend a clue on how to find the place if they are having any difficulty!"
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
      <Button fill style={styles.navigationButton} onPress={_handleNext}>
        Next Step
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: "space-between"
  }
});

export default TakeImageScreen;
