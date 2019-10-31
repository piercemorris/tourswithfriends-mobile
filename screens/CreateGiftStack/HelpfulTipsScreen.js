import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";

const HelpfulTipsScreen = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <Header title="Helpful Tips" />
      <Button onPress={() => props.navigation.navigate("FriendDetails")}>
        Start!
      </Button>
    </SafeAreaView>
  );
};

export default HelpfulTipsScreen;
