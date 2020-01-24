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
        <LargeButton />
        <LargeButton />
        <LargeButton />
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
  }
});

export default TourListScreen;
