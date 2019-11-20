import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import Title from "../../components/UI/Title";
import BackButton from "../../components/UI/BackButton";
import ButtonInverse from "../../components/UI/ButtonInverse";

const GiftSetScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Gift Creation" subtitle="What you need to complete" />
        <View style={styles.contentContainer}>
          <Title title="Friend Details" />
          <ButtonInverse
            text="Enter Friends Details"
            onPress={() => props.navigation.navigate("FriendDetails")}
          />
          <Title title="Tour Details" />
          <ButtonInverse
            text="Enter Tour Details"
            onPress={() => props.navigation.navigate("TourDetails")}
          />
          <Title title="Location 1" />
          <ButtonInverse
            text="Add to location 1"
            onPress={() => props.navigation.navigate("LocationStack")}
          />
          <Title title="Location 2" />
          <ButtonInverse
            text="Add to location 2"
            onPress={() => props.navigation.navigate("LocationStack")}
          />
          <Title title="Location 3" />
          <ButtonInverse
            text="Add to location 3"
            onPress={() => props.navigation.navigate("LocationStack")}
          />
        </View>
      </View>
      <Button onPress={() => {}}>Complete</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  contentContainer: {
    paddingTop: 15
  }
});

export default GiftSetScreen;
