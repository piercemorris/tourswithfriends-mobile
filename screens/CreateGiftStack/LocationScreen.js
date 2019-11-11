import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import * as locationActions from "../../store/actions/location";

import {
  getLocation,
  getRegionFrom,
  getReverseGeocode,
  useCompare
} from "../../helper/reusableFunctions";

const LocationScreen = props => {
  [currentLocation, setCurrentLocation] = useState(null);
  [selectedAddress, setSelectedAddress] = useState(null);
  [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useCompare(props.isFocused);

  useEffect(() => {
    if (isFocused === props.isFocused) {
      const address = props.navigation.getParam("address");
      if (address) setSelectedAddress(address);
    }
  });

  useEffect(() => {
    dispatch(locationActions.updateAddress(selectedAddress));
  }, [selectedAddress]);

  useEffect(() => {
    dispatch(locationActions.updateLocation(currentLocation));
  }, [currentLocation]);

  _returnAddressLocation = data => {
    setCurrentLocation(data.location);
    setSelectedAddress(data.address);
  };

  _getLocation = async () => {
    try {
      const location = await getLocation();
      const accurateLocation = getRegionFrom(
        location.coords.latitude,
        location.coords.longitude,
        1000 // location.coords.accuracy
      );
      const address = await getReverseGeocode(accurateLocation);

      setCurrentLocation(accurateLocation);
      setSelectedAddress(address[0]);
    } catch (ex) {}
  };

  _navigateToSelectLocation = async () => {
    setIsLoading(true);
    await _getLocation();
    setIsLoading(false);
    props.navigation.navigate("SelectLocation", {
      location: currentLocation,
      returnData: _returnAddressLocation
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
            <ActivityIndicator color={Colors.primary} />
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
        <View style={styles.addressContainer}>
          {selectedAddress && (
            <StyledText bold style={styles.address}>
              {selectedAddress.name}, {selectedAddress.city}
            </StyledText>
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
  },
  addressContainer: {
    paddingHorizontal: 10
  },
  address: {
    color: Colors.secondary,
    fontSize: 18
  }
});

export default withNavigationFocus(LocationScreen);
