import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const DURATION = 100;
const CIRCLE_DIM = 32;
const SQUARE_DIM = 24;
const CIRCLE_RAD = CIRCLE_DIM / 2;
const SQUARE_RAD = 5;

const RecordIcon = ({ isRecording }) => {
  const [dimension] = useState(new Animated.Value(32));
  const [radius] = useState(new Animated.Value(16));

  console.log("isRecording?", isRecording);

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
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    borderColor: Colors.primary,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    backgroundColor: Colors.secondary
  }
});

export default RecordIcon;
