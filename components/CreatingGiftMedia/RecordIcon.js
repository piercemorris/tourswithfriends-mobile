import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const DURATION = 100;
const CIRCLE_DIM = Layout.window.width / 3;
const SQUARE_DIM = Layout.window.width / 3.75;
const CIRCLE_RAD = CIRCLE_DIM / 2;
const SQUARE_RAD = 5;

const RecordIcon = ({ isRecording }) => {
  const [dimension] = useState(new Animated.Value(CIRCLE_DIM));
  const [radius] = useState(new Animated.Value(CIRCLE_RAD));

  useEffect(() => {
    if (isRecording) {
      Animated.parallel([
        Animated.timing(dimension, {
          toValue: SQUARE_DIM,
          duration: DURATION
        }),
        Animated.timing(radius, {
          toValue: SQUARE_RAD,
          duration: DURATION
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(dimension, {
          toValue: CIRCLE_DIM,
          duration: DURATION
        }),
        Animated.timing(radius, {
          toValue: CIRCLE_RAD,
          duration: DURATION
        })
      ]).start();
    }
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.icon,
          width: dimension,
          height: dimension,
          borderRadius: radius
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width / 2.25,
    height: Layout.window.width / 2.25,
    borderRadius: Layout.window.width / 4.5,
    borderColor: Colors.primary,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    backgroundColor: Colors.secondary
  }
});

export default RecordIcon;
