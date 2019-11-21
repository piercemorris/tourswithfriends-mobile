import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { useScreens } from "react-native-screens";
import { initFirebase } from "./firebase/index";
import * as Font from "expo-font";
useScreens();

import authReducer from "./store/reducers/auth";
import locationReducer from "./store/reducers/location";

const rootReducer = combineReducers({
  auth: authReducer,
  gift: locationReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import AppNavigator from "./navigation/AppNavigator";

initFirebase()
  .then(res => console.log("firebase initialised"))
  .catch(err => console.log(err));

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/maskedGroup.png"),
      require("./assets/images/maskedGroup2.png"),
      require("./assets/images/iconInv.png"),
      require("./assets/images/ellipse.png")
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      "sf-bold": require("./assets/fonts/SFProText-Bold.ttf"),
      "sf-regular": require("./assets/fonts/SFProText-Regular.ttf"),
      "sf-medium": require("./assets/fonts/SFProText-Medium.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
