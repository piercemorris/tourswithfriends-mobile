import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import StyledText from "../../components/StyledText";
import Layout from "../../constants/Layout";
import { getReverseGeocode } from "../../helper/reusableFunctions";

const SelectLocationScreen = props => {
  [currentLocation, setCurrentLocation] = useState(
    props.navigation.getParam("location")
  );
  [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    const getAddress = async () => {
      const address = await getReverseGeocode(currentLocation);
      setCurrentAddress(address[0]);
    };

    getAddress();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Select Location" />
        <MapView region={currentLocation} style={styles.mapStyle} />
        {currentAddress && (
          <View>
            <StyledText style={styles.addressText}>
              {currentAddress.name}
            </StyledText>
            <StyledText style={styles.addressText}>
              {currentAddress.street}
            </StyledText>
            <StyledText style={styles.addressText}>
              {currentAddress.city}
            </StyledText>
          </View>
        )}
        <StyledText>
          Place a single marker on the marker then hit confirm to make your
          selection
        </StyledText>
      </View>
      <Button onPress={() => {}}>Confirm</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  mapStyle: {
    marginVertical: 15,
    alignSelf: "center",
    borderRadius: 15,
    width: Layout.window.width - 40,
    height: Layout.window.height / 2
  },
  addressText: {
    paddingVertical: 0
  }
});

export default SelectLocationScreen;
