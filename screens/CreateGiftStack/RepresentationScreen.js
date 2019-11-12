import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Input from "../../components/UI/Input";
import Title from "../../components/UI/Title";
import Layout from "../../constants/Layout";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";
import StyledText from "../../components/StyledText";
import Colors from "../../constants/Colors";

const RepresentationScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton />
        <Header title="Location 1" subtitle="Select method of representation" />
      </View>
      <Button onPress={() => {}}>Next</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default RepresentationScreen;
