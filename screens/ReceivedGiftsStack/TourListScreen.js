import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
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
          image={gift.locationThree.image}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("TourItem", {
                id: 1,
                name: gift.locationOne.name,
                location: gift.locationOne,
                image: gift.locationOne.image
              });
            }}
          >
            <Text style={styles.title}>LOCATION 1</Text>
          </TouchableOpacity>
        </LargeButton>
        <LargeButton
          id={2}
          animated
          delay={500}
          control={control}
          completed={locationTwoCompleted}
          image={gift.locationTwo.image}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("TourItem", {
                id: 2,
                name: gift.locationTwo.name,
                location: gift.locationTwo,
                image: gift.locationTwo.image
              });
            }}
          >
            <Text style={styles.title}>LOCATION 2</Text>
          </TouchableOpacity>
        </LargeButton>
        <LargeButton
          id={3}
          animated
          delay={1000}
          control={control}
          completed={locationThreeCompleted}
          image={gift.locationThree.image}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("TourItem", {
                id: 3,
                name: gift.locationThree.name,
                location: gift.locationThree,
                image: gift.locationThree.image
              });
            }}
          >
            <Text style={styles.title}>LOCATION 3</Text>
          </TouchableOpacity>
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
