import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import Header from "../../components/UI/Header";
import BackButton from "../../components/UI/BackButton";
import Subsection from "../../components/UI/Subsection";
import CircleButton from "../../components/UI/CircleButton";
import MethodEnum from "../../helper/representationEnum";

const RepresentationScreen = props => {
  const _setMethod = method => {
    props.navigation.state.params.returnData({
      method
    });
    props.navigation.goBack();
  };

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
          <CircleButton disabled onPress={() => {}}>
            Video Recording
          </CircleButton>
        </ScrollView>
        <Subsection text="Image" />
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.buttonContainer}
        >
          <CircleButton onPress={() => {}}>Image</CircleButton>
          <CircleButton disabled onPress={() => {}}>
            Image & Text
          </CircleButton>
        </ScrollView>
        <Subsection text="Location" />
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.buttonContainer}
        >
          <CircleButton disabled onPress={() => {}}>
            Alert
          </CircleButton>
          <CircleButton disabled onPress={() => {}}>
            Music Alert
          </CircleButton>
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
