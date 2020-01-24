import React, { useState, useEffect } from "react";
import { View, Animated, Text, StyleSheet, Easing } from "react-native";

import BackButton from "../../components/UI/BackButton";

const TourItemScreen = props => {
  const [animComplete, setAnimComplete] = useState(false);
  const [name] = useState(props.navigation.getParam("name"));

  const renderScreen = () => {
    setAnimComplete(true);
  };

  return (
    <View style={styles.container}>
      <BackButton {...props} />
      {animComplete === false ? (
        <FadeInOutView onAnimationComplete={renderScreen}>
          <Text style={styles.text}>{name}</Text>
        </FadeInOutView>
      ) : (
        <View>
          <Text>TourItemScreen</Text>
        </View>
      )}
    </View>
  );
};

const FadeInOutView = props => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: 2000
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        easing: Easing.cubic,
        duration: 1000
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "sf-bold",
    fontSize: 28
  }
});

export default TourItemScreen;
