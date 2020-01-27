import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import Colors from "../../constants/Colors";

const LargeButton = props => {
  if (props.disabled) {
    return <View style={styles.disabled}></View>;
  }

  if (props.animated) {
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
      TouchableOpacity
    );
    const [fadeAnim, setFaseAnim] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: 1000,
        delay: props.delay
      }).start(() => setFaseAnim(1));
    }, []);

    return (
      <AnimatedTouchableOpacity
        onPress={props.onPress}
        style={{ ...styles.container, opacity: fadeAnim }}
      >
        {props.children}
      </AnimatedTouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        {props.children}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15
  },
  disabled: {}
});

export default LargeButton;
