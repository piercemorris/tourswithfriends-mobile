import React, { useState, useEffect } from "react";
import { Animated, View, Easing } from "react-native";
import PropTypes from "prop-types";

const FadeInOutView = props => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: props.durationOne || 2000
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        easing: Easing.cubic,
        duration: props.durationTwo || 1000
      })
    ]).start(() => props.onAnimationComplete());
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

FadeInOutView.propTypes = {
  durationOne: PropTypes.number,
  durationTwo: PropTypes.number
};

export default FadeInOutView;
