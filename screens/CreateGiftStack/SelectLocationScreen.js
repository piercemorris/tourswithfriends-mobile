import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import StyledText from "../../components/StyledText";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import {
  getReverseGeocode,
  getRegionFrom
} from "../../helper/reusableFunctions";

const SelectLocationScreen = props => {
  [current, setCurrent] = useState(props.navigation.getParam("location"));
  [currentAddress, setCurrentAddress] = useState(null);
  [isMapPressed, setIsMapPressed] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const getAddress = async () => {
      if (isSubscribed) {
        const address = await getReverseGeocode(current);
        setCurrentAddress(address[0]);
      }
    };
    if (isSubscribed) {
      getAddress();
    }

    return () => (isSubscribed = false);
  }, [current]);

  const onMapPress = data => {
    setIsMapPressed(true);
    const location = getRegionFrom(
      data.nativeEvent.coordinate.latitude,
      data.nativeEvent.coordinate.longitude,
      1000
    );
    setCurrent(location);
  };

  const confirmAddress = () => {
    props.navigation.state.params.returnData({
      location: current,
      address: currentAddress
    });
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Select Location" />
        <MapView
          onPress={data => onMapPress(data)}
          initialRegion={current}
          style={styles.mapStyle}
        >
          {isMapPressed && current && <Marker coordinate={current} />}
        </MapView>
        {currentAddress && (
          <View>
            <StyledText>
              Select a location by pressing on the Map that will mark the area
            </StyledText>
            <StyledText bold style={styles.addressText}>
              {currentAddress.name}, {currentAddress.city}
            </StyledText>
          </View>
        )}
      </View>
      <Button onPress={() => confirmAddress()}>Confirm</Button>
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
    paddingVertical: 0,
    color: Colors.secondary
  }
});

export default SelectLocationScreen;
