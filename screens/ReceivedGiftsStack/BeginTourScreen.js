import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import StyledText from "../../components/StyledText";
import BackButton from "../../components/UI/BackButton";
import BulletPoint from "../../components/UI/BulletPoint";

const BeginTourScreen = props => {
  const [id] = useState(props.navigation.getParam("id"));
  const [name] = useState(props.navigation.getParam("name"));
  const [city] = useState(props.navigation.getParam("city"));
  const [user] = useState(props.navigation.getParam("user"));

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton {...props} />
        <Header title={name} subtitle={"In " + city} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default BeginTourScreen;
