import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Header from "../../../components/UI/Header";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import SmallTitle from "../../../components/UI/SmallTitle";
import MapView from "../../../components/UI/MapView";

const TakeLocationScreen = props => {
  const [locationId] = useState(props.navigation.getParam("id"));
  const [selectedName, setSelectedName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Header style={{ marginBottom: 10 }} title={`Location ${locationId}`} />
        <Input
          id="name"
          title="Name"
          defaultValue={selectedName}
          onInputChange={(id, value, valid) => setSelectedName(value)}
        />
        <SmallTitle title="Select Location" />
        <MapView />
      </View>
      <Button
        fill
        style={styles.navigationButton}
        onPress={() => props.navigation.navigate("TakeImage")}
      >
        Next Step
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: "space-between"
  },
  main: {
    flex: 1
  }
});

export default TakeLocationScreen;
