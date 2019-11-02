import React from "react";
import { View, SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";
import BackButton from "../../components/UI/BackButton";

const FriendDetailsScreen = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <View>
        <BackButton {...props} />
        <Header title="Your friends' details" />
      </View>
      <Button onPress={() => props.navigation.navigate("TourDetails")}>
        Next
      </Button>
    </SafeAreaView>
  );
};

export default FriendDetailsScreen;
