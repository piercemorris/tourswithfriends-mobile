import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Input from "../../components/UI/Input";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import StyledText from "../../components/StyledText";

const TourDetailsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Tour Details" subtitle="Describe your tour" />
        <StyledText>
          To package your tour, we need some details about what the tour is
          about, and where it will begin.
        </StyledText>
        <Input id="title" title="Title" onInputChange={() => {}} />
        <Input id="city" title="City/location" onInputChange={() => {}} />
        <Input
          id="desc"
          title="Tour description"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          onInputChange={() => {}}
        />
        <Input
          id="start"
          title="Describe the starting location"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          onInputChange={() => {}}
        />
      </View>
      <Button onPress={() => props.navigation.pop()}>Complete</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default TourDetailsScreen;
