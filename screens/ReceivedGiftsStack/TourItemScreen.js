import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Animated,
  Text,
  StyleSheet,
  Easing
} from "react-native";

import BackButton from "../../components/UI/BackButton";
import FadeInOutView from "../../components/Animation/FadeInOutView";

const TourItemScreen = props => {
  const [animComplete, setAnimComplete] = useState(false);
  const [name] = useState(props.navigation.getParam("name"));

  const renderScreen = () => {
    setAnimComplete(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {animComplete === false ? (
        <FadeInOutView
          style={styles.animation}
          onAnimationComplete={renderScreen}
        >
          <Text style={styles.text}>{name}</Text>
        </FadeInOutView>
      ) : (
        <View style={{ flex: 1 }}>
          <BackButton {...props} />
          <View style={styles.screenContainer}>
            <Text>TourItemScreen</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
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
