import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import {
  getLocation,
  getRegionFrom,
  numberToFormattedKm,
  numberToFormattedMin
} from "../../helper/reusableFunctions";
import FadeInOutView from "../../components/Animation/FadeInOutView";
import BackButton from "../../components/UI/BackButton";
import Button from "../../components/UI/Button";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const TourItemScreen = props => {
  const [animComplete, setAnimComplete] = useState(false);
  const [name] = useState(props.navigation.getParam("name"));
  const [gift] = useState(props.navigation.getParam("location"));
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState({
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
      distance: info.distance,
      duration: info.duration
    });

    mapReference.fitToCoordinates(info.coordinates, {
      edgePadding: {
        right: Layout.window.width / 20,
        left: Layout.window.width / 20,
        top: Layout.window.height / 20,
        bottom: Layout.window.height / 20
      }
    });
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
                mode="WALKING"
                apikey={"AIzaSyAjzHyyGtVdYT7B_v-zBfsAWIqyaq3WfAw"}
                onReady={details => _onDirectionsReady(details)}
              />
            ) : null}
          </MapView>
          <BackButton
            style={{
              position: "absolute",
              top: 0,
              left: 20
            }}
            {...props}
          />
          <View style={styles.infoBox}>
            {travelInfo ? (
              <View style={styles.textContainer}>
                <Text style={styles.highlight}>
                  Destination
                  <Text style={styles.infoText}>{` ${gift.name}`}</Text>
                </Text>
                <Text style={styles.highlight}>
                  Distance
                  <Text style={styles.infoText}>
                    {` ${numberToFormattedKm(travelInfo.distance)}`}
                  </Text>
                  km
                </Text>
                <Text style={styles.highlight}>
                  Duration
                  <Text style={styles.infoText}>
                    {` ${numberToFormattedMin(travelInfo.duration)} `}
                  </Text>
                  minutes
                </Text>
                <Button style={{ width: "100%" }}>Go!</Button>
              </View>
            ) : null}
          </View>
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
  },
  infoBox: {
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    padding: 20,
    width: Layout.window.width - 40,
    height: Layout.window.height / 3,
    backgroundColor: Colors.white,
    borderRadius: 15,
    ...Layout.shadow
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  infoText: {
    fontFamily: "sf-bold",
    fontSize: 22,
    marginTop: 15,
    color: Colors.primary
  },
  highlight: {
    fontFamily: "sf-bold",
    fontSize: 22,
    color: Colors.black
  }
});

export default TourItemScreen;
