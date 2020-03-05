import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  View
} from "react-native";

const LargeButton = props => {
  if (props.animated) {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: 1000,
        delay: props.delay
      }).start();
    }, []);

    return (
      <Animated.View
        disabled
        style={{ ...styles.container, opacity: fadeAnim }}
      >
        <ImageBackground
          blurRadius={ props.id < props.control ? 0 : 100}
          style={styles.imageBackground}
          source={{ uri: props.image }}
          imageStyle={{ borderRadius: 15 }}
        >
          {props.children}
        </ImageBackground>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 15
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  }
});

export default LargeButton;
