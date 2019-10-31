import React from "react";
import { SafeAreaView } from "react-native";

import Header from "../../components/UI/Header";
import Button from "../../components/UI/Button";

const FriendDetailsScreen = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <Header title="Your friends' details" />
      <Button
        style={styles.button}
        onPress={() => props.navigation.navigate("TourDetails")}
      >
        Next
      </Button>
    </SafeAreaView>
  );
};

export default FriendDetailsScreen;
