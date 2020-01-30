import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import {
  numberToFormattedKm,
  numberToFormattedMin
} from "../../helper/reusableFunctions";
import Button from "./Button";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

const MapInfoBox = props => {
  if (props.isTracking) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.highlight}>
            Destination
            <Text style={styles.text}>{` ${props.info.name}`}</Text>
          </Text>
          <Text style={styles.highlight}>
            <Text style={styles.text}>
              {` ${numberToFormattedKm(props.info.distance)}`}
            </Text>
            km remaining
          </Text>
          <Text style={styles.highlight}>
            <Text style={styles.text}>
              {` ${numberToFormattedMin(props.info.duration)} `}
            </Text>
            minutes left
          </Text>
          <Button
            onPress={() => props.navigateToComponent()}
            style={{ width: "100%" }}
          >
            I'm close!
          </Button>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.highlight}>
            Destination
            <Text style={styles.text}>{` ${props.info.name}`}</Text>
          </Text>
          <Text style={styles.highlight}>
            Distance
            <Text style={styles.text}>
              {` ${numberToFormattedKm(props.info.distance)}`}
            </Text>
            km
          </Text>
          <Text style={styles.highlight}>
            Duration
            <Text style={styles.text}>
              {` ${numberToFormattedMin(props.info.duration)} `}
            </Text>
            minutes
          </Text>
          <Button onPress={() => props.setListener()} style={{ width: "100%" }}>
            Go!
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
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
  text: {
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

MapInfoBox.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  }),
  onPress: PropTypes.func,
  disabled: PropTypes.bool
};

export default MapInfoBox;
