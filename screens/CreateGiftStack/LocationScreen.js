import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import Input from "../../components/UI/Input";
import Title from "../../components/UI/Title";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

import { getLocation, getRegionFrom } from "../../helper/reusableFunctions";

const LocationScreen = props => {
  [currentLocation, setCurrentLocation] = useState(null);
  [isLoading, setIsLoading] = useState(false);

  _getLocation = async () => {
    const location = await getLocation();
    setCurrentLocation(location);
  };

  _navigateToSelectLocation = async () => {
    setIsLoading(true);
    await _getLocation();
    setIsLoading(false);
    props.navigation.navigate("SelectLocation", {
      location: getRegionFrom(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        currentLocation.coords.accuracy
      )
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Location 1" />
        <Input
          style={{ marginTop: 20 }}
          id="name"
          title="Name"
          onInputChange={() => {}}
        />
        <Title title="Location Coordinates" />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            viewStyle={styles.view}
            onPress={() => _getLocation()}
          >
            Current Location
          </Button>
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Button
              style={styles.button}
              viewStyle={styles.view}
              onPress={() => _navigateToSelectLocation()}
            >
              Select Location
            </Button>
          )}
        </View>
      </View>
      <Button onPress={() => {}}>Next</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    width: Layout.window.width,
    paddingHorizontal: 20
  },
  button: {
    width: "45%",
    padding: 0
  },
  view: {
    paddingHorizontal: 0
  }
});

export default LocationScreen;
