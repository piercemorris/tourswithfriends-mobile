import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Header from "../../components/UI/Header";
import BackButton from "../../components/UI/BackButton";
import LargeButton from "../../components/UI/LargeButton";
import Colors from "../../constants/Colors";

const TourListScreen = props => {
  const gift = useSelector(store => store.received.currentGift);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...props} />
      <Header
        title="Tour Breakdown"
        subtitle={`Start in ${gift.tourDetails.start}`}
      />
      <View style={styles.buttonContainer}>
        <LargeButton
          animated
          delay={0}
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
          animated
          delay={500}
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
          animated
          delay={1000}
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
