import React, { useState, useEffect } from "react";
import { View, Vibration, StyleSheet, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

import CircleButton from "../../components/UI/CircleButton";

const CameraScreen = props => {
  [hasCameraPermission, setHasCameraPermission] = useState(false);
  [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  [picture, setPicture] = useState(null);

  useEffect(() => {
    _getCameraPermission();
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch(e => {
      // directory exists
    });
  }, []);

  _getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  _takePicture = async () => {
    if (this.camera) {
      Vibration.vibrate(500);
      this.camera.takePictureAsync({
        onPictureSaved: _onPictureSaved,
        quality: 0.25
      });
    }
  };

  _onPictureSaved = async pic => {
    const time = Date.now();
    const newLocation = `${FileSystem.documentDirectory}photos/${time}.jpg`;

    try {
      await FileSystem.moveAsync({
        from: pic.uri,
        to: newLocation
      });
      setPicture(newLocation);
      props.navigation.state.params.returnData(picture);
      props.navigation.pop();
    } catch (ex) {
      console.log(ex);
    }
  };

  if (hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={styles.cameraView}>
            <View></View>
            <View style={styles.bottomNavigator}>
              <CircleButton onPress={() => _takePicture()} />
            </View>
          </View>
        </Camera>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>No permissions</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  cameraView: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "transparent",
    justifyContent: "space-between"
  },
  bottomNavigator: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 35
  }
});

export default CameraScreen;
