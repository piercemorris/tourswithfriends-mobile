import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { withNavigationFocus } from "react-navigation";

import Input from "../../components/UI/Input";
import Title from "../../components/UI/Title";
import Layout from "../../constants/Layout";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import Colors from "../../constants/Colors";

import {
  getLocation,
  getRegionFrom,
  useCompare
} from "../../helper/reusableFunctions";

const LocationScreen = props => {
  [currentLocation, setCurrentLocation] = useState(null);
  [selectedAddress, setSelectedAddress] = useState(null);
  [isLoading, setIsLoading] = useState(false);

  const isFocused = useCompare(props.isFocused);

  useEffect(() => {
    if (isFocused === props.isFocused) {
      const address = props.navigation.getParam("address");
      console.log(address);
      if (address) setSelectedAddress(address);
    }
  });

  _getLocation = async () => {
    try {
      const location = await getLocation();
      setCurrentLocation(location);
    } catch (ex) {}
  };

  _navigateToSelectLocation = async () => {
    setIsLoading(true);
    await _getLocation();
    const address = getRegionFrom(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
      currentLocation.coords.accuracy
    );
    setIsLoading(false);
    setSelectedAddress(address);
    props.navigation.navigate("SelectLocation", {
      location: address
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
        <View>{selectedAddress && <Text>{selectedAddress.name}</Text>}</View>
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

export default withNavigationFocus(LocationScreen);
