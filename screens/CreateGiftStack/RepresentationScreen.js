import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import Header from "../../components/UI/Header";
import BackButton from "../../components/UI/BackButton";
import Subsection from "../../components/UI/Subsection";
import CircleButton from "../../components/UI/CircleButton";
import Colors from "../../constants/Colors";

const RepresentationScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BackButton {...props} />
        <Header title="Location 1" subtitle="Select method of representation" />
        <Subsection text="Video" />
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.buttonContainer}
        >
          <CircleButton disabled>Video Recording</CircleButton>
        </ScrollView>
        <Subsection text="Image" />
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.buttonContainer}
        >
          <CircleButton>Image</CircleButton>
          <CircleButton disabled>Image & Text</CircleButton>
        </ScrollView>
        <Subsection text="Location" />
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.buttonContainer}
        >
          <CircleButton disabled>Alert</CircleButton>
          <CircleButton disabled>Music Alert</CircleButton>
        </ScrollView>
        <Subsection text="Audio" />
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.buttonContainer}
        >
          <CircleButton disabled>Voice Recording</CircleButton>
          <CircleButton disabled>Audio Recording</CircleButton>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  buttonContainer: {
    flexDirection: "row"
  }
});

export default RepresentationScreen;
