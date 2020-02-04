import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Header from "../../components/UI/Header";
import BackButton from "../../components/UI/BackButton";
import LargeButton from "../../components/UI/LargeButton";
import Colors from "../../constants/Colors";

const TourListScreen = props => {
  const gift = useSelector(store => store.received.currentGift);
  const control = useSelector(store => store.received.control);
  const locationOneCompleted = useSelector(
    store => store.received.locationOneCompleted
  );
  const locationTwoCompleted = useSelector(
    store => store.received.locationTwoCompleted
  );
  const locationThreeCompleted = useSelector(
    store => store.received.locationThreeCompleted
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...props} />
      <Header
        title="Tour Breakdown"
        subtitle={`Start in ${gift.tourDetails.start}`}
      />
      <View style={styles.buttonContainer}>
        <LargeButton
          id={1}
          animated
          delay={0}
          control={control}
          completed={locationOneCompleted}
          onPress={() => {
            props.navigation.navigate("TourItem", {
              id: 1,
              name: gift.locationOne.name,
              location: gift.locationOne
            });
          }}
        >
          <Text style={styles.title}>{gift.locationOne.name}</Text>
        </LargeButton>
        <LargeButton
          id={2}
          animated
          delay={500}
          control={control}
          completed={locationTwoCompleted}
          onPress={() => {
            props.navigation.navigate("TourItem", {
              id: 2,
              name: gift.locationTwo.name,
              location: gift.locationTwo
            });
          }}
        >
          <Text style={styles.title}>{gift.locationTwo.name}</Text>
        </LargeButton>
        <LargeButton
          id={3}
          animated
          delay={1000}
          control={control}
          completed={locationThreeCompleted}
          onPress={() => {
            props.navigation.navigate("TourItem", {
              id: 3,
              name: gift.locationThree.name,
              location: gift.locationThree
            });
          }}
        >
          <Text style={styles.title}>{gift.locationThree.name}</Text>
        </LargeButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flex: 1
  },
  title: {
    fontFamily: "sf-bold",
    fontSize: 28,
    color: Colors.white
  }
});

export default TourListScreen;
