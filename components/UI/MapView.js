import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Constants from "../../constants/Constants";
import { getLocation, getRegionFrom } from "../../helper/reusableFunctions";
import Colors from "../../constants/Colors";

const CustomMapView = props => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [accurateLocation, setAccurateLocation] = useState(null);

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
  const _onMapPress = data => {
    const markerLocation = getRegionFrom(
      data.nativeEvent.coordinate.latitude,
      data.nativeEvent.coordinate.longitude,
      Constants.DEFAULT_ACCURACY
    );
    setSelectedLocation(markerLocation);
  };

  return (
    <MapView
      initialRegion={accurateLocation}
      onPress={_onMapPress}
      style={styles.container}
    >
      {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.inputShade,
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CustomMapView;
