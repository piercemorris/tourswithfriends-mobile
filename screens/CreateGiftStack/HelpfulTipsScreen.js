import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";

const HelpfulTipsScreen = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <View style={{}}>
        <BackButton {...props} />
        <Header title="Helpful Tips" subtitle="What to expect" />
      </View>
      <Button onPress={() => props.navigation.navigate("FriendDetails")}>
        Start!
      </Button>
    </SafeAreaView>
  );
};

export default HelpfulTipsScreen;
