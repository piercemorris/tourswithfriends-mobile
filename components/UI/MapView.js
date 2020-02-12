import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Constants from "../../constants/Constants";
import {
  getLocation,
  getRegionFrom,
  getReverseGeocode
} from "../../helper/reusableFunctions";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const CustomMapView = props => {
  const [accurateLocation, setAccurateLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    _getCurrentLocation();
  }, []);

  // calculate current location and accurate range location
  const _getCurrentLocation = async () => {
    const currentLocCoords = await getLocation();
    const accurateLocCoords = getRegionFrom(
      currentLocCoords.coords.latitude,
      currentLocCoords.coords.longitude,
      Constants.DEFAULT_ACCURACY
    );
    setAccurateLocation(accurateLocCoords);
  };

  // get marker location and set marker
  const _onMapPress = async data => {
    const markerLocation = getRegionFrom(
      data.nativeEvent.coordinate.latitude,
      data.nativeEvent.coordinate.longitude,
      Constants.DEFAULT_ACCURACY
    );
    const address = await getReverseGeocode(markerLocation);

    setSelectedAddress(address[0]);
    setSelectedLocation(markerLocation);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={accurateLocation}
        onPress={_onMapPress}
        style={styles.map}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.overMapContainer}>
        <Text style={styles.addressText}>
          {selectedAddress
            ? `${selectedAddress.name}, ${selectedAddress.city}`
            : "Select a place by tapping on the map"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.inputShade,
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 15,
    justifyContent: "center"
  },
  map: {
    flex: 1,
    borderRadius: 15
  },
  overMapContainer: {
    position: "absolute",
    alignSelf: "center",
    ...Layout.shadow,
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: Layout.window.width - 50,
    height: Layout.window.height / 16,
    top: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  addressText: {
    fontFamily: "sf-bold",
    fontSize: 18,
    color: Colors.primary
  }
});

export default CustomMapView;
