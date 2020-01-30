import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Camera } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

import {
  getLocation,
  getRegionFrom,
  numberToFormattedKm,
  numberToFormattedMin
} from "../../helper/reusableFunctions";
import FadeInOutView from "../../components/Animation/FadeInOutView";
import BackButton from "../../components/UI/BackButton";
import MapInfoBox from "../../components/UI/MapInfoBox";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const TourItemScreen = props => {
  const [animComplete, setAnimComplete] = useState(false);
  const [name] = useState(props.navigation.getParam("name"));
  const [gift] = useState(props.navigation.getParam("location"));
  const [location, setLocation] = useState(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [watchPositionListener, setWatchPositionListener] = useState(null);
  const [destination] = useState({
    latitude: gift.location.latitude,
    longitude: gift.location.longitude
  });
  const [travelInfo, setTravelInfo] = useState(null);
  const [mapReference, setMapReference] = useState(null);

  useEffect(() => {
    _getCurrentLocation();
  }, []);

  _getCurrentLocation = async () => {
    try {
      const location = await getLocation();
      const regionData = getRegionFrom(
        location.coords.latitude,
        location.coords.longitude,
        500
      );
      setLocation([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        regionData
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  _onDirectionsReady = info => {
    setTravelInfo({
      name: name,
      distance: info.distance,
      duration: info.duration
    });

    if (!isTrackingLocation) {
      mapReference.fitToCoordinates(info.coordinates, {
        edgePadding: {
          right: Layout.window.width / 20,
          left: Layout.window.width / 20,
          top: Layout.window.height / 20,
          bottom: Layout.window.height / 20
        }
      });
    }
  };

  const _watchPosition = loc => {
    const locationCoords = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude
    };

    const regionData = getRegionFrom(
      loc.coords.latitude,
      loc.coords.longitude,
      500
    );

    setLocation([locationCoords, regionData]);
  };

  const _navigateToTourComponent = () => {
    watchPositionListener.remove();
    props.navigation.pop();
  };

  const _setWatchListener = async () => {
    setIsTrackingLocation(true);

    mapReference.animateCamera(
      {
        center: location[0],
        altitude: 500
      },
      1000
    );

    const locationListener = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
        mayShowUserSettingsDialog: true
      },
      e => _watchPosition(e)
    );
    setWatchPositionListener(locationListener);
  };

  const renderScreen = () => {
    setAnimComplete(true);
  };

  return (
    <View style={styles.container}>
      {animComplete === false ? (
        <FadeInOutView
          style={styles.animation}
          onAnimationComplete={renderScreen}
        >
          <Text style={styles.text}>{name}</Text>
        </FadeInOutView>
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            ref={ref => setMapReference(ref)}
            style={{ flex: 1 }}
            showsUserLocation={true}
            showsBuildings={true}
            showsCompass={true}
            initialRegion={
              location ? { ...location[0], ...location[1] } : gift.location
            }
          >
            <Marker
              coordinate={destination}
              title={gift.name}
              description={gift.address.postalCode}
            />
            {location ? (
              <MapViewDirections
                origin={location[0]}
                destination={destination}
                strokeWidth={5}
                strokeColor={Colors.primary}
                resetOnChange={false}
                mode="WALKING"
                apikey={"AIzaSyAjzHyyGtVdYT7B_v-zBfsAWIqyaq3WfAw"}
                onReady={details => _onDirectionsReady(details)}
              />
            ) : null}
          </MapView>
          {travelInfo ? (
            <MapInfoBox
              info={travelInfo}
              isTracking={isTrackingLocation}
              setListener={_setWatchListener}
              navigateToComponent={_navigateToTourComponent}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "sf-bold",
    fontSize: 28
  },
  animation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TourItemScreen;
