import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Input from "../../components/UI/Input";
import Title from "../../components/UI/Title";
import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";

const LocationScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title="Location 1" />
        <Input
          style={{ marginTop: 20 }}
          id="name"
          title="Name"
          onInputChange={() => {}}
        />
        <Title title="Location Coordinates" />
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

export default LocationScreen;
